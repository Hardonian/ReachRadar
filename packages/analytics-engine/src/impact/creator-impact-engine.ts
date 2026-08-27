import { ChannelShiftImpact, ImpactClassification } from "@reachradar/domain";

export interface ChannelImpactEvaluationInput {
  shiftId: string;
  channelId: string;
  channelViewsDeltaPct: number;
  cohortViewsDeltaPct: number;
  channelCtrDeltaPct?: number;
  channelAvdDeltaPct?: number;
  channelSurfaceDeltas?: Record<string, number>;
  channelHistoryDays: number;
  shiftConfidenceScore: number;
}

export function evaluateChannelImpact(
  input: ChannelImpactEvaluationInput
): ChannelShiftImpact {
  const {
    shiftId,
    channelId,
    channelViewsDeltaPct,
    cohortViewsDeltaPct,
    channelCtrDeltaPct = 0,
    channelSurfaceDeltas = {},
    channelHistoryDays,
    shiftConfidenceScore,
  } = input;

  if (channelHistoryDays < 14) {
    return {
      id: `impact-${shiftId}-${channelId}`,
      shiftId,
      channelId,
      classification: "INSUFFICIENT_DATA",
      confidenceScore: 30,
      observedDeltaPercentage: Math.round(channelViewsDeltaPct * 10) / 10,
      cohortDeltaPercentage: Math.round(cohortViewsDeltaPct * 10) / 10,
      relativePerformanceDelta: 0,
      surfaceImpacts: channelSurfaceDeltas,
      evidenceSummary: "Insufficient historical observations to establish a robust personal baseline.",
      createdAt: new Date().toISOString(),
    };
  }

  const relativePerf = channelViewsDeltaPct - cohortViewsDeltaPct;
  const isCohortShifting = Math.abs(cohortViewsDeltaPct) >= 8;

  let classification: ImpactClassification = "NOT_CLEARLY_AFFECTED";
  let confidenceScore = Math.min(100, Math.round(shiftConfidenceScore * 0.9));
  let evidenceSummary = "";

  if (isCohortShifting) {
    // Cohort has an active shift
    if (cohortViewsDeltaPct < 0) {
      // Negative shift
      if (channelViewsDeltaPct <= cohortViewsDeltaPct + 8) {
        // Channel dropped significantly alongside cohort
        classification = "LIKELY_AFFECTED";
        evidenceSummary = `Your channel experienced a ${channelViewsDeltaPct.toFixed(1)}% decline, closely mirroring your matched cohort (${cohortViewsDeltaPct.toFixed(1)}%). Content engagement metrics remain healthy.`;
      } else if (channelViewsDeltaPct >= -4) {
        // Channel resisted cohort decline
        classification = "OUTPERFORMING_COHORT";
        evidenceSummary = `Your channel showed strong resilience (${channelViewsDeltaPct >= 0 ? "+" : ""}${channelViewsDeltaPct.toFixed(1)}%) while the matched cohort declined ${cohortViewsDeltaPct.toFixed(1)}%.`;
      } else {
        classification = "NOT_CLEARLY_AFFECTED";
        evidenceSummary = `Channel movement (${channelViewsDeltaPct.toFixed(1)}%) is within normal personal variance relative to the cohort (${cohortViewsDeltaPct.toFixed(1)}%).`;
      }
    } else {
      // Positive cohort surge
      if (channelViewsDeltaPct >= cohortViewsDeltaPct - 8) {
        classification = "LIKELY_AFFECTED";
        evidenceSummary = `Your channel gained ${channelViewsDeltaPct.toFixed(1)}% reach, matching the upward distribution movement across your cohort (${cohortViewsDeltaPct.toFixed(1)}%).`;
      } else {
        classification = "NOT_CLEARLY_AFFECTED";
        evidenceSummary = `Cohort distribution expanded by ${cohortViewsDeltaPct.toFixed(1)}%, but your channel reach remained steady.`;
      }
    }
  } else {
    // Cohort is stable, but channel dropped
    if (channelViewsDeltaPct <= -18) {
      classification = "CHANNEL_SPECIFIC_DECLINE";
      confidenceScore = 85;
      const ctrDropped = channelCtrDeltaPct <= -6;
      evidenceSummary = ctrDropped
        ? `Your views dropped ${channelViewsDeltaPct.toFixed(1)}% while your cohort remained stable (${cohortViewsDeltaPct.toFixed(1)}%). Lower CTR (${channelCtrDeltaPct.toFixed(1)}%) suggests a packaging or thumbnail response issue.`
        : `Your views dropped ${channelViewsDeltaPct.toFixed(1)}% while your cohort remained stable (${cohortViewsDeltaPct.toFixed(1)}%), pointing to channel-specific factors rather than an algorithm shift.`;
    } else {
      classification = "NOT_CLEARLY_AFFECTED";
      confidenceScore = 70;
      evidenceSummary = `Channel variance (${channelViewsDeltaPct >= 0 ? "+" : ""}${channelViewsDeltaPct.toFixed(1)}%) is within expected historical baseline bounds.`;
    }
  }

  return {
    id: `impact-${shiftId}-${channelId}`,
    shiftId,
    channelId,
    classification,
    confidenceScore,
    observedDeltaPercentage: Math.round(channelViewsDeltaPct * 10) / 10,
    cohortDeltaPercentage: Math.round(cohortViewsDeltaPct * 10) / 10,
    relativePerformanceDelta: Math.round(relativePerf * 10) / 10,
    surfaceImpacts: channelSurfaceDeltas,
    evidenceSummary,
    createdAt: new Date().toISOString(),
  };
}
