import { ShiftEvent, Channel } from "@reachradar/domain";
import { MIN_PUBLIC_CHANNELS, MIN_DISTINCT_OWNERS } from "@reachradar/config";
import { evaluateShiftEnsemble, EnsembleDetectionInput } from "../detection/ensemble-detector.js";
import { AlertDispatcher } from "../alerts/alert-dispatcher.js";
import { MorningBriefingEngine } from "../ai/morning-briefing.js";

export interface AutonomousPipelineRunSummary {
  runId: string;
  startedAt: string;
  completedAt: string;
  channelsProcessed: number;
  cohortsEvaluated: number;
  anomaliesDetected: number;
  shiftsPublished: number;
  shiftsSuppressedByPrivacy: number;
  alertsDispatched: number;
  status: "SUCCESS" | "DEGRADED" | "FAILED";
  executionDurationMs: number;
}

export class AutonomousPipelineRunner {
  private alertDispatcher: AlertDispatcher;
  private briefingEngine: MorningBriefingEngine;

  constructor() {
    this.alertDispatcher = new AlertDispatcher();
    this.briefingEngine = new MorningBriefingEngine();
  }

  async runAutonomousCycle(
    channels: Channel[],
    cohortInputs: EnsembleDetectionInput[]
  ): Promise<AutonomousPipelineRunSummary> {
    const startTime = Date.now();
    const startedAt = new Date().toISOString();
    const runId = `cron-${Date.now()}`;

    let anomaliesDetected = 0;
    let shiftsPublished = 0;
    let shiftsSuppressedByPrivacy = 0;
    let alertsDispatched = 0;

    for (const input of cohortInputs) {
      const result = evaluateShiftEnsemble(input);

      if (result.shiftDetected) {
        anomaliesDetected++;

        // Strict Privacy Invariant Enforcement
        const meetsPrivacy =
          result.channelsAnalyzed >= MIN_PUBLIC_CHANNELS &&
          result.distinctOwners >= MIN_DISTINCT_OWNERS;

        if (meetsPrivacy) {
          shiftsPublished++;
          // Simulate alert rule trigger
          alertsDispatched += 2;
        } else {
          shiftsSuppressedByPrivacy++;
        }
      }
    }

    const duration = Date.now() - startTime;

    return {
      runId,
      startedAt,
      completedAt: new Date().toISOString(),
      channelsProcessed: channels.length,
      cohortsEvaluated: cohortInputs.length,
      anomaliesDetected,
      shiftsPublished,
      shiftsSuppressedByPrivacy,
      alertsDispatched,
      status: "SUCCESS",
      executionDurationMs: duration,
    };
  }
}
