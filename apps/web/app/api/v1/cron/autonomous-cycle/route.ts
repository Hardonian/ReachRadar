import { NextResponse } from "next/server";
import { AutonomousPipelineRunner } from "@reachradar/analytics-engine";
import { DEMO_CHANNELS } from "@reachradar/providers";

export async function POST() {
  try {
    const runner = new AutonomousPipelineRunner();

    // Mock cohort inputs representing daily telemetry
    const cohortInputs = [
      {
        platform: "youtube" as const,
        cohortId: "cohort-finance-macro",
        cohortName: "Finance & Wealth · Macro Band",
        channelDeviations: DEMO_CHANNELS.map((c) => ({
          channelId: c.id,
          ownerId: c.organizationId,
          viewsDeltaPct: c.id.includes("finance") ? -18.7 : 2.1,
          ctrDeltaPct: 0.2,
          retentionDeltaPct: -0.5,
          surfaceDeltas: { browse: -24.2, suggested: 8.5, search: 1.2 },
          zScore: -2.3,
          historyDays: 28,
        })),
        cohortDailyZScores: [-0.2, -0.4, -0.8, -1.9, -2.4, -2.3, -2.5],
        cohortTimeSeriesViews: [52000, 51500, 53000, 41000, 39500, 40200, 39800],
        externalDemandCorrelation: 0.12,
      },
    ];

    const result = await runner.runAutonomousCycle(DEMO_CHANNELS, cohortInputs);

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Autonomous cycle failed", message: err.message },
      { status: 500 }
    );
  }
}
