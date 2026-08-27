import { describe, it, expect } from "vitest";
import { InMemoryJobQueue } from "../src/queue/postgres-queue";

describe("Transactional Job Queue", () => {
  it("enqueues and claims jobs with locking semantics", async () => {
    const queue = new InMemoryJobQueue();

    const jobId = await queue.enqueueJob({
      jobType: "analysis.platform",
      payload: { platform: "youtube" },
    });

    expect(jobId).toBeDefined();

    const claimed = await queue.claimJobs("worker_1", 5);
    expect(claimed.length).toBe(1);
    expect(claimed[0].id).toBe(jobId);
    expect(claimed[0].state).toBe("running");

    // Second worker cannot claim the same locked job
    const secondClaim = await queue.claimJobs("worker_2", 5);
    expect(secondClaim.length).toBe(0);

    // Complete job
    await queue.completeJob(jobId);
    const jobs = await queue.getJobs();
    expect(jobs[0].state).toBe("completed");
  });

  it("handles failure retries and transitions to dead letter after max attempts", async () => {
    const queue = new InMemoryJobQueue();
    const jobId = await queue.enqueueJob({
      jobType: "youtube.sync",
      payload: { channelId: "ch_1" },
      maxAttempts: 2,
    });

    // Claim and fail 1st time
    await queue.claimJobs("worker_1", 1);
    await queue.failJob(jobId, "Temporary 503 error");

    let jobs = await queue.getJobs();
    expect(jobs[0].state).toBe("queued");
    expect(jobs[0].attempts).toBe(1);

    // Claim and fail 2nd time -> dead letter
    await queue.claimJobs("worker_1", 1);
    await queue.failJob(jobId, "Permanent failure");

    jobs = await queue.getJobs();
    expect(jobs[0].state).toBe("dead");
  });
});
