export type JobType =
  | "youtube.initial_sync"
  | "youtube.incremental_sync"
  | "youtube.refresh_metadata"
  | "analysis.channel"
  | "analysis.cohort"
  | "analysis.platform"
  | "alerts.evaluate"
  | "alerts.deliver"
  | "reports.generate"
  | "maintenance.cleanup"
  | "maintenance.rollup";

export type JobState = "queued" | "running" | "completed" | "failed" | "dead";

export interface Job {
  id: string;
  jobType: JobType;
  payload: Record<string, unknown>;
  state: JobState;
  attempts: number;
  maxAttempts: number;
  availableAt: string;
  lockedAt: string | null;
  lockedBy: string | null;
  lastError: string | null;
  completedAt: string | null;
  idempotencyKey: string | null;
  createdAt: string;
}

export interface IngestionRun {
  id: string;
  channelId: string;
  jobId: string | null;
  startedAt: string;
  completedAt: string | null;
  status: "running" | "success" | "partial" | "failed";
  recordsProcessed: number;
  earliestDate: string | null;
  latestDate: string | null;
  errorMessage: string | null;
}

export interface QuotaUsage {
  id: string;
  provider: string;
  usageDate: string; // YYYY-MM-DD
  operation: string;
  estimatedUnits: number;
  requestCount: number;
  successCount: number;
  failureCount: number;
  updatedAt: string;
}
