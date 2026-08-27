import { NextResponse } from "next/server";
import { getServerEnv } from "@reachradar/config";
import { InMemoryJobQueue } from "@reachradar/database";

const queue = new InMemoryJobQueue();

export async function POST(request: Request) {
  const env = getServerEnv();
  const authHeader = request.headers.get("authorization");

  // Verify CRON_SECRET if configured
  if (env.CRON_SECRET) {
    const expected = `Bearer ${env.CRON_SECRET}`;
    if (authHeader !== expected && authHeader !== env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized cron execution" }, { status: 401 });
    }
  }

  const workerId = `serverless_worker_${Date.now()}`;
  const claimedJobs = await queue.claimJobs(workerId, 10);
  const processed: string[] = [];

  for (const job of claimedJobs) {
    try {
      // Execute job logic according to job.jobType
      await queue.completeJob(job.id);
      processed.push(job.id);
    } catch (err: any) {
      await queue.failJob(job.id, err.message || "Job execution failure");
    }
  }

  return NextResponse.json({
    status: "ok",
    workerId,
    claimedCount: claimedJobs.length,
    processedJobs: processed,
    timestamp: new Date().toISOString(),
  });
}
