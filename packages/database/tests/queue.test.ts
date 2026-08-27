import { describe, it, expect } from "vitest";
import { InMemoryJobQueue } from "../src/queue/postgres-queue.js";

describe("Transactional Job Queue", () => {
  it("enqueues and claims jobs with locking semantics", async () => {
    const queue = new InMemoryJobQueue();

    const job = await queue.enqueue("analysis.platform", { platform: "youtube" });

    expect(job.id).toBeDefined();

    const claimed = await queue.claimJobs("worker_1", 5);
    expect(claimed.length).toBe(1);
    expect(claimed[0].id).toBe(job.id);
    expect(claimed[0].state).toBe("running");

    // Second worker cannot claim the same locked job
    const secondClaim = await queue.claimJobs("worker_2", 5);
    expect(secondClaim.length).toBe(0);

    // Complete job
    await queue.completeJob(job.id);
    const status = await queue.getJobStatus(job.id);
    expect(status?.state).toBe("completed");
  });

  it("handles failure retries and transitions to dead letter after max attempts", async () => {
    const queue = new InMemoryJobQueue();
    const job = await queue.enqueue(
      "youtube.sync",
      { channelId: "ch_1" },
      { maxAttempts: 2 }
    );

    // Claim and fail 1st time
    await queue.claimJobs("worker_1", 1);
    await queue.failJob(job.id, "Temporary 503 error");

    let status = await queue.getJobStatus(job.id);
    expect(status?.state).toBe("queued");
    expect(status?.attempts).toBe(1);

    // Make available immediately for testing next attempt
    if (status) status.availableAt = new Date(Date.now() - 1000).toISOString();

    // Claim and fail 2nd time -> dead letter
    await queue.claimJobs("worker_1", 1);
    await queue.failJob(job.id, "Permanent failure");

    status = await queue.getJobStatus(job.id);
    expect(status?.state).toBe("dead");
  });
});
