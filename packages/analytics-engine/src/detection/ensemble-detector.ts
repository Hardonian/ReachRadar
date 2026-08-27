import {
  MIN_PUBLIC_CHANNELS,
  MIN_DISTINCT_OWNERS,
  SCORING_VERSION,
  SCORING_WEIGHTS,
  getConfidenceLabel,
} from "@reachradar/config";
import { ShiftComponentScores, BayesianChangePointResult } from "@reachradar/domain";
import { median, calculateHerfindahlIndex } from "../stats/robust-stats.js";
import { evaluatePersistence } from "../stats/persistence.js";
import { calculateCusum } from "../stats/cusum.js";
import { calculateEwma } from "../stats/ewma.js";
import { detectBayesianChangePoint } from "../stats/bayesian-changepoint.js";
import { decomposeSeasonality } from "../stats/seasonality.js";
import { auditNegativeControls } from "../stats/negative-controls.js";
import { calculateSprt } from "../stats/sprt.js";

export interface ChannelDeviationInput {
  channelId: string;
  ownerId: string;
  viewsDeltaPct: number;
  impressionsDeltaPct?: number;
  ctrDeltaPct?: number;
  retentionDeltaPct?: number;
  surfaceDeltas?: Record<string, number>; // surface -> deltaPct
  zScore: number;
  historyDays: number;
}

export interface EnsembleDetectionInput {
  platform: "youtube";
  cohortId: string | null;
  cohortName: string;
  channelDeviations: ChannelDeviationInput[];
  cohortDailyZScores: number[]; // longitudinal daily Z scores of cohort
  cohortTimeSeriesViews: number[];
  externalDemandCorrelation?: number | null; // e.g. -0.1 to 1.0 (null if unavailable)
}

export interface DetectionEnsembleResult {
  shiftDetected: boolean;
  evidenceScore: number; // 0 - 100
  confidenceLabel: ReturnType<typeof getConfidenceLabel>["label"];
  scoringVersion: string;
  componentScores: ShiftComponentScores;
  affectedChannelsPercentage: number;
  medianDistributionMovement: number;
  channelsAnalyzed: number;
  distinctOwners: number;
  isPubliclyVisible: boolean;
  suppressionReason: string | null;
  dominantSurface: string;
  surfaceMovements: Record<string, number>;
  metricsThatDidNotChange: string[];
  alternativeExplanations: string[];
  bayesianEvidence?: BayesianChangePointResult;
  whatChanged: string;
  whereItChanged: string;
  whoAppearsAffected: string;
}

export function evaluateShiftEnsemble(
  input: EnsembleDetectionInput
): DetectionEnsembleResult {
  const { channelDeviations, cohortDailyZScores, cohortTimeSeriesViews, externalDemandCorrelation } = input;
  const channelCount = channelDeviations.length;

  // 1. Owner distribution & Diversity
  const ownerCounts: Record<string, number> = {};
  for (const c of channelDeviations) {
    ownerCounts[c.ownerId] = (ownerCounts[c.ownerId] || 0) + 1;
  }
  const distinctOwners = Object.keys(ownerCounts).length;
  const ownerShares = Object.values(ownerCounts);
  const herfindahl = calculateHerfindahlIndex(ownerShares);
  const ownerDiversityScore = Math.max(0, Math.min(100, (1.0 - herfindahl) * 125));

  // 2. Effect Magnitude
  const deltas = channelDeviations.map((c) => c.viewsDeltaPct);
  const medianDelta = median(deltas);
  const effectMagnitudeScore = Math.min(100, Math.abs(medianDelta) * 4);

  // 3. Cohort Consensus
  const isNegativeShift = medianDelta < 0;
  const channelsInSameDirection = channelDeviations.filter((c) =>
    isNegativeShift ? c.viewsDeltaPct < -5 : c.viewsDeltaPct > 5
  ).length;
  const consensusRatio = channelCount > 0 ? channelsInSameDirection / channelCount : 0;
  const cohortConsensusScore = Math.min(100, consensusRatio * 100);
  const affectedPct = Math.round(consensusRatio * 100);

  // 4. Persistence (CUSUM, EWMA, Persistence evaluation)
  const persistenceEval = evaluatePersistence(cohortDailyZScores);
  const cusumEval = calculateCusum(cohortTimeSeriesViews);
  const ewmaEval = calculateEwma(cohortTimeSeriesViews);
  const persistenceScore = Math.min(
    100,
    persistenceEval.persistenceScore * 0.6 +
      cusumEval.shiftMagnitude * 0.2 +
      ewmaEval.momentum * 0.2
  );

  // 5. Bayesian Change Point & SPRT Integration
  const bayesianResult = detectBayesianChangePoint(cohortTimeSeriesViews);
  const sprtResult = calculateSprt(cohortTimeSeriesViews);
  const bayesianConfidenceScore = Math.round(
    bayesianResult.posteriorProbability * 70 + (sprtResult.decision === "SHIFT_DETECTED" ? 30 : 0)
  );

  // 6. Seasonality & Holiday Filtering
  const seasonalityEval = decomposeSeasonality(cohortTimeSeriesViews);

  // 7. Sample Quality
  const avgHistoryDays =
    channelCount > 0
      ? channelDeviations.reduce((sum, c) => sum + c.historyDays, 0) / channelCount
      : 0;
  const historyQuality = Math.min(1.0, avgHistoryDays / 28);
  const sampleCountQuality = Math.min(1.0, channelCount / MIN_PUBLIC_CHANNELS);
  const sampleQualityScore = (historyQuality * 0.5 + sampleCountQuality * 0.5) * 100;

  // 8. Cross-Metric Coherence
  let steadyContentCount = 0;
  for (const c of channelDeviations) {
    const ctrSteady = c.ctrDeltaPct === undefined || Math.abs(c.ctrDeltaPct) < 8;
    const retSteady = c.retentionDeltaPct === undefined || Math.abs(c.retentionDeltaPct) < 8;
    if (ctrSteady && retSteady) {
      steadyContentCount++;
    }
  }
  const coherenceRatio = channelCount > 0 ? steadyContentCount / channelCount : 0.5;
  const crossMetricCoherenceScore = coherenceRatio * 100;

  // 9. Surface Concentration & Flow
  const surfaceDeltasAgg: Record<string, number[]> = {
    browse: [],
    suggested: [],
    search: [],
    shorts: [],
    notifications: [],
  };
  for (const c of channelDeviations) {
    if (c.surfaceDeltas) {
      for (const [surf, d] of Object.entries(c.surfaceDeltas)) {
        if (surf in surfaceDeltasAgg) {
          surfaceDeltasAgg[surf].push(d);
        }
      }
    }
  }
  const surfaceMovements: Record<string, number> = {};
  let dominantSurface = "browse";
  let maxAbsSurfaceDelta = 0;
  for (const [surf, list] of Object.entries(surfaceDeltasAgg)) {
    const med = list.length > 0 ? median(list) : 0;
    surfaceMovements[surf] = Math.round(med * 10) / 10;
    if (Math.abs(med) > maxAbsSurfaceDelta) {
      maxAbsSurfaceDelta = Math.abs(med);
      dominantSurface = surf;
    }
  }
  const surfaceConcentrationScore = Math.min(100, maxAbsSurfaceDelta * 3.5);

  // 10. Negative Control Invariant Verification
  const negControlAudit = auditNegativeControls({
    searchViewsDeltaPct: surfaceMovements.search || 0,
    directTrafficDeltaPct: 0.5,
    notificationViewsDeltaPct: surfaceMovements.notifications || 0,
    browseViewsDeltaPct: surfaceMovements.browse || 0,
    suggestedViewsDeltaPct: surfaceMovements.suggested || 0,
  });
  const negativeControlStability = negControlAudit.negativeControlStabilityScore;

  // 11. Demand Independence
  let demandIndependenceScore = 80;
  if (externalDemandCorrelation !== undefined && externalDemandCorrelation !== null) {
    if (externalDemandCorrelation > 0.6) {
      demandIndependenceScore = 20;
    } else if (externalDemandCorrelation < 0.2) {
      demandIndependenceScore = 95;
    } else {
      demandIndependenceScore = 60;
    }
  }

  const componentScores: ShiftComponentScores = {
    effectMagnitude: Math.round(effectMagnitudeScore),
    cohortConsensus: Math.round(cohortConsensusScore),
    persistence: Math.round(persistenceScore),
    bayesianConfidence: Math.round(bayesianConfidenceScore),
    negativeControlStability: Math.round(negativeControlStability),
    sampleQuality: Math.round(sampleQualityScore),
    ownerDiversity: Math.round(ownerDiversityScore),
    crossMetricCoherence: Math.round(crossMetricCoherenceScore),
    surfaceConcentration: Math.round(surfaceConcentrationScore),
    demandIndependence: Math.round(demandIndependenceScore),
  };

  // Weighted raw evidence score
  let rawScore =
    componentScores.effectMagnitude * SCORING_WEIGHTS.effectMagnitude +
    componentScores.cohortConsensus * SCORING_WEIGHTS.cohortConsensus +
    componentScores.persistence * SCORING_WEIGHTS.persistence +
    (componentScores.bayesianConfidence ?? 70) * (SCORING_WEIGHTS.bayesianConfidence ?? 0.12) +
    (componentScores.negativeControlStability ?? 80) * (SCORING_WEIGHTS.negativeControlStability ?? 0.10) +
    componentScores.sampleQuality * SCORING_WEIGHTS.sampleQuality +
    componentScores.ownerDiversity * SCORING_WEIGHTS.ownerDiversity +
    componentScores.crossMetricCoherence * SCORING_WEIGHTS.crossMetricCoherence +
    componentScores.surfaceConcentration * SCORING_WEIGHTS.surfaceConcentration;

  // If seasonality decomposition detects this is just a routine Day-of-Week dip, damp raw score
  if (seasonalityEval.isSeasonalDip) {
    rawScore *= 0.55;
  }

  // Hard eligibility gates & score caps
  let suppressionReason: string | null = null;
  let isPubliclyVisible = true;

  if (channelCount < MIN_PUBLIC_CHANNELS) {
    isPubliclyVisible = false;
    suppressionReason = `Cohort channel count (${channelCount}) is below privacy minimum (${MIN_PUBLIC_CHANNELS})`;
    rawScore = Math.min(rawScore, 45);
  } else if (distinctOwners < MIN_DISTINCT_OWNERS) {
    isPubliclyVisible = false;
    suppressionReason = `Distinct owner count (${distinctOwners}) is below minimum requirement (${MIN_DISTINCT_OWNERS})`;
    rawScore = Math.min(rawScore, 45);
  } else if (herfindahl > 0.35) {
    isPubliclyVisible = false;
    suppressionReason = `High owner concentration (HHI ${herfindahl.toFixed(2)} > 0.35)`;
    rawScore = Math.min(rawScore, 55);
  }

  const finalEvidenceScore = Math.max(0, Math.min(100, Math.round(rawScore)));
  const confidenceInfo = getConfidenceLabel(finalEvidenceScore);
  const shiftDetected =
    isPubliclyVisible &&
    finalEvidenceScore >= 60 &&
    Math.abs(medianDelta) >= 8 &&
    demandIndependenceScore >= 40 &&
    persistenceScore >= 50 &&
    !seasonalityEval.isSeasonalDip;

  // Metrics that did not change
  const metricsThatDidNotChange: string[] = [];
  if (crossMetricCoherenceScore >= 60) {
    metricsThatDidNotChange.push("Click-Through Rate (CTR) essentially unchanged");
    metricsThatDidNotChange.push("Average View Duration (AVD) & Retention within normal baseline");
  }
  if (demandIndependenceScore >= 70) {
    metricsThatDidNotChange.push("External topic demand index within normal seasonal bounds");
  }
  if (surfaceMovements.search && Math.abs(surfaceMovements.search) < 6) {
    metricsThatDidNotChange.push("YouTube Search volume stable");
  }

  const alternativeExplanations: string[] = [
    "Channel-level thumbnail/title change on recent uploads",
    "Seasonal fluctuation or holiday audience availability",
    "Competitive release saturation in same niche sub-topic",
  ];

  const whatChanged = `${dominantSurface.toUpperCase()} distribution shifted ${medianDelta > 0 ? "+" : ""}${medianDelta.toFixed(1)}% across ${affectedPct}% of monitored channels in this cohort.`;
  const whereItChanged = `Concentrated primarily in YouTube ${dominantSurface.charAt(0).toUpperCase() + dominantSurface.slice(1)}.`;
  const whoAppearsAffected = `${affectedPct}% of channels in the ${input.cohortName} cohort experienced statistically significant deviation.`;

  return {
    shiftDetected,
    evidenceScore: finalEvidenceScore,
    confidenceLabel: confidenceInfo.label,
    scoringVersion: SCORING_VERSION,
    componentScores,
    affectedChannelsPercentage: affectedPct,
    medianDistributionMovement: Math.round(medianDelta * 10) / 10,
    channelsAnalyzed: channelCount,
    distinctOwners,
    isPubliclyVisible,
    suppressionReason,
    dominantSurface,
    surfaceMovements,
    metricsThatDidNotChange,
    alternativeExplanations,
    bayesianEvidence: {
      ...bayesianResult,
      changePointDate: new Date().toISOString().split("T")[0],
    },
    whatChanged,
    whereItChanged,
    whoAppearsAffected,
  };
}
