import { Job, JobType } from "@reachradar/domain";

export interface EnqueueOptions {
  availableAt?: Date;
  maxAttempts?: number;
  idempotencyKey?: string;
}

export interface JobQueue {
  enqueue(jobType: JobType, payload: Record<string, unknown>, options?: EnqueueOptions): Promise<Job>;
  claimJobs(workerId: string, batchSize?: number, jobTypes?: JobType[]): Promise<Job[]>;
  completeJob(jobId: string): Promise<void>;
  failJob(jobId: string, error: string): Promise<void>;
  getJobStatus(jobId: string): Promise<Job | null>;
}

/**
 * In-memory / SQL reference implementation of Postgres-backed Job Queue with FOR UPDATE SKIP LOCKED semantics.
 */
export class InMemoryJobQueue implements JobQueue {
  private jobs: Map<string, Job> = new Map();
  private idempotencyMap: Map<string, string> = new Map(); // idempotencyKey -> jobId

  async enqueue(
    jobType: JobType,
    payload: Record<string, unknown>,
    options: EnqueueOptions = {}
  ): Promise<Job> {
    if (options.idempotencyKey) {
      const existingId = this.idempotencyMap.get(options.idempotencyKey);
      if (existingId) {
        const existing = this.jobs.get(existingId);
        if (existing && existing.state !== "failed" && existing.state !== "dead") {
          return existing;
        }
      }
    }

    const id = `job_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const job: Job = {
      id,
      jobType,
      payload,
      state: "queued",
      attempts: 0,
      maxAttempts: options.maxAttempts ?? 5,
      availableAt: (options.availableAt ?? new Date()).toISOString(),
      lockedAt: null,
      lockedBy: null,
      lastError: null,
      completedAt: null,
      idempotencyKey: options.idempotencyKey ?? null,
      createdAt: new Date().toISOString(),
    };

    this.jobs.set(id, job);
    if (options.idempotencyKey) {
      this.idempotencyMap.set(options.idempotencyKey, id);
    }

    return job;
  }

  async claimJobs(workerId: string, batchSize = 10, jobTypes?: JobType[]): Promise<Job[]> {
    const now = new Date();
    const claimed: Job[] = [];

    for (const job of this.jobs.values()) {
      if (claimed.length >= batchSize) break;

      // Filter by type if provided
      if (jobTypes && !jobTypes.includes(job.jobType)) continue;

      // Must be queued, and availableAt <= now
      const isAvailable = new Date(job.availableAt) <= now;
      const isStaleLock =
        job.state === "running" &&
        job.lockedAt &&
        now.getTime() - new Date(job.lockedAt).getTime() > 10 * 60 * 1000; // 10 min lock timeout

      if ((job.state === "queued" && isAvailable) || isStaleLock) {
        job.state = "running";
        job.lockedAt = now.toISOString();
        job.lockedBy = workerId;
        job.attempts += 1;
        claimed.push({ ...job });
      }
    }

    return claimed;
  }

  async completeJob(jobId: string): Promise<void> {
    const job = this.jobs.get(jobId);
    if (!job) return;

    job.state = "completed";
    job.lockedAt = null;
    job.lockedBy = null;
    job.completedAt = new Date().toISOString();
  }

  async failJob(jobId: string, error: string): Promise<void> {
    const job = this.jobs.get(jobId);
    if (!job) return;

    job.lastError = error;
    job.lockedAt = null;
    job.lockedBy = null;

    if (job.attempts >= job.maxAttempts) {
      job.state = "dead";
    } else {
      job.state = "queued";
      // Exponential backoff with jitter: 2^attempts * 10s + random(0-5s)
      const backoffSec = Math.pow(2, job.attempts) * 10 + Math.random() * 5;
      const nextAvailable = new Date(Date.now() + backoffSec * 1000);
      job.availableAt = nextAvailable.toISOString();
    }
  }

  async getJobStatus(jobId: string): Promise<Job | null> {
    return this.jobs.get(jobId) ?? null;
  }

  getStats() {
    let queued = 0;
    let running = 0;
    let completed = 0;
    let failed = 0;
    let dead = 0;

    for (const job of this.jobs.values()) {
      if (job.state === "queued") queued++;
      else if (job.state === "running") running++;
      else if (job.state === "completed") completed++;
      else if (job.state === "failed") failed++;
      else if (job.state === "dead") dead++;
    }

    return { queued, running, completed, failed, dead, total: this.jobs.size };
  }
}
