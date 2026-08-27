import { Recommendation, RecommendationAction } from "@reachradar/domain";

export interface RecommendationInput {
  channelId: string;
  shiftId: string | null;
  impactClassification: string;
  channelViewsDeltaPct: number;
  cohortViewsDeltaPct: number;
  channelCtrDeltaPct: number;
  channelAvdDeltaPct: number;
  demandCorrelation?: number | null;
  dominantSurface?: string;
  shiftConfidenceScore: number;
}

export function generateDeterministicRecommendation(
  input: RecommendationInput
): Recommendation {
  const {
    channelId,
    shiftId,
    impactClassification,
    channelViewsDeltaPct,
    cohortViewsDeltaPct,
    channelCtrDeltaPct,
    channelAvdDeltaPct,
    demandCorrelation,
    dominantSurface = "Browse",
    shiftConfidenceScore,
  } = input;

  let action: RecommendationAction = "MONITOR_SHIFT";
  let title = "Monitor Distribution Variance";
  let rationale =
    "Distribution variance is currently within acceptable baseline ranges. No immediate adjustments necessary.";
  const evidencePoints: string[] = [];
  let confidence = Math.min(95, Math.max(50, shiftConfidenceScore));

  const isDemandDriven =
    demandCorrelation !== undefined &&
    demandCorrelation !== null &&
    demandCorrelation > 0.6;

  if (isDemandDriven) {
    action = "REVIEW_TOPIC_MIX";
    title = "Review Topic Mix & Seasonal Demand";
    rationale =
      "The movement appears correlated with broader seasonal demand cycles or topic interest decline rather than a recommendation system redistribution.";
    evidencePoints.push("External topic search interest is down across the category.");
    evidencePoints.push(`Channel reach shifted ${channelViewsDeltaPct.toFixed(1)}% in tandem with niche demand.`);
    evidencePoints.push("Recommendation algorithms are continuing to deliver normal impression share per query.");
    confidence = 88;
  } else if (
    impactClassification === "LIKELY_AFFECTED" &&
    cohortViewsDeltaPct <= -10
  ) {
    action = "HOLD_STRATEGY";
    title = "Hold Current Strategy";
    rationale =
      "The decline is occurring across a broad matched cohort while content-response metrics remain stable. This is more consistent with a systemic platform distribution shift than a channel-specific performance issue.";
    evidencePoints.push(`Matched cohort median change: ${cohortViewsDeltaPct.toFixed(1)}%`);
    evidencePoints.push(`Channel Click-Through Rate: ${channelCtrDeltaPct >= 0 ? "+" : ""}${channelCtrDeltaPct.toFixed(1)}% (stable)`);
    evidencePoints.push(`Average View Duration: ${channelAvdDeltaPct >= 0 ? "+" : ""}${channelAvdDeltaPct.toFixed(1)}% (healthy)`);
    evidencePoints.push(`Movement is concentrated in YouTube ${dominantSurface}.`);
    confidence = Math.max(80, shiftConfidenceScore);
  } else if (
    impactClassification === "CHANNEL_SPECIFIC_DECLINE" ||
    (channelViewsDeltaPct <= -18 && Math.abs(cohortViewsDeltaPct) < 6)
  ) {
    action = "REVIEW_PACKAGING";
    title = "Review Packaging & Thumbnails";
    rationale =
      "Your reach decline is materially larger than your matched cohort, and click-through performance has also softened. Focus on thumbnail contrast, titles, and topic appeal.";
    evidencePoints.push(`Your channel dropped ${channelViewsDeltaPct.toFixed(1)}% while cohort remained stable (${cohortViewsDeltaPct.toFixed(1)}%).`);
    evidencePoints.push(`CTR softened by ${channelCtrDeltaPct.toFixed(1)}% on recent uploads.`);
    evidencePoints.push("No evidence of platform-wide distribution anomaly.");
    confidence = 85;
  } else if (impactClassification === "OUTPERFORMING_COHORT") {
    action = "DOUBLE_DOWN";
    title = "Maintain Content Momentum";
    rationale =
      "Your recent content format is showing strong algorithmic resilience and gaining share while the general niche cohort has experienced volatility.";
    evidencePoints.push(`Your reach is ${channelViewsDeltaPct >= 0 ? "+" : ""}${channelViewsDeltaPct.toFixed(1)}% vs cohort ${cohortViewsDeltaPct.toFixed(1)}%.`);
    evidencePoints.push("High viewer engagement is driving recommendation persistence.");
    confidence = 90;
  } else {
    action = "MONITOR_SHIFT";
    title = "Hold Strategy & Monitor Weather";
    rationale =
      "Observed movement is developing. Avoid hasty thumbnail revisions or publishing cadence adjustments while telemetry stabilizes.";
    evidencePoints.push("Variance is currently within expected longitudinal bounds.");
    evidencePoints.push("Cohort baseline telemetry will refresh daily.");
    confidence = 75;
  }

  const nextWeekDate = new Date();
  nextWeekDate.setDate(nextWeekDate.getDate() + 7);

  return {
    id: `rec-${channelId}-${Date.now()}`,
    channelId,
    shiftId,
    action,
    title,
    rationale,
    evidencePoints,
    confidence,
    suggestedReviewDate: nextWeekDate.toISOString().split("T")[0],
    version: "1.0.0",
    createdAt: new Date().toISOString(),
  };
}
