import { ConfidenceLabel } from "@reachradar/config";
import { Platform } from "./channel.js";
import { NormalizedDistributionSurface } from "./metrics.js";

export type ShiftState = "active" | "developing" | "stabilizing" | "resolved";

export type ImpactClassification =
  | "LIKELY_AFFECTED"
  | "NOT_CLEARLY_AFFECTED"
  | "OUTPERFORMING_COHORT"
  | "CHANNEL_SPECIFIC_DECLINE"
  | "INSUFFICIENT_DATA";

export type RecommendationAction =
  | "HOLD_STRATEGY"
  | "REVIEW_PACKAGING"
  | "REVIEW_TOPIC_MIX"
  | "MONITOR_SHIFT"
  | "DOUBLE_DOWN";

export interface ShiftComponentScores {
  effectMagnitude: number; // 0 - 100
  cohortConsensus: number; // 0 - 100
  persistence: number; // 0 - 100
  sampleQuality: number; // 0 - 100
  ownerDiversity: number; // 0 - 100
  crossMetricCoherence: number; // 0 - 100
  surfaceConcentration: number; // 0 - 100
  demandIndependence: number; // 0 - 100
  bayesianConfidence?: number; // 0 - 100
  negativeControlStability?: number; // 0 - 100
}

export interface BayesianChangePointResult {
  detected: boolean;
  posteriorProbability: number; // 0.0 - 1.0
  changePointIndex: number;
  changePointDate: string;
  credibleIntervalLower: number;
  credibleIntervalUpper: number;
  bayesFactor: number;
}

export interface SurfaceFlowVector {
  sourceSurface: string;
  targetSurface: string;
  flowVolumeDeltaPct: number;
  redistributionShare: number; // percentage of shifted volume
  regimeType: "contraction" | "expansion" | "diversification" | "polarization";
}

export interface CounterfactualImpact {
  channelId: string;
  shiftId: string;
  startDate: string;
  endDate: string;
  actualViews: number;
  counterfactualExpectedViews: number;
  lostOrGainedViews: number;
  lostOrGainedViewsLowerCI95: number;
  lostOrGainedViewsUpperCI95: number;
  estimatedRpmImpactUsd: number;
  recoveryVelocityDays: number;
  dailyTrajectories: Array<{
    date: string;
    actual: number;
    expected: number;
    ci95Lower: number;
    ci95Upper: number;
  }>;
}

export interface ForensicAutopsyReport {
  id: string;
  shiftId: string;
  cohortName: string;
  executiveSummary: string;
  rootCauseHypothesis: string;
  confidenceScore: number;
  primaryDrivers: Array<{
    driver: string;
    impactSharePct: number;
    evidence: string;
  }>;
  surfaceRedistributionBreakdown: Record<string, number>;
  negativeControlsVerified: Array<{
    metricName: string;
    observedVariancePct: number;
    status: "PASS_INVARIANT" | "FAIL_ANOMALOUS";
  }>;
  durationSensitivity: {
    shortUnder3m: number;
    mid3to10m: number;
    long10to25m: number;
    epic25mPlus: number;
  };
  algorithmicRegime: "EXPLORATION_SURGE" | "EXPLOITATION_CONSOLIDATION" | "PACKAGING_REWEIGHTING" | "RETENTION_THRESHOLD_ELEVATION";
  tacticalPrescription: string[];
  isAiGenerated: boolean;
  generatedAt: string;
}

export interface CrossPlatformCorrelation {
  primaryPlatform: Platform;
  targetPlatform: Platform;
  correlationCoefficient: number; // -1.0 to 1.0
  isCoVolatile: boolean;
  sharedMacroDrivers: string[];
}

export interface ShiftEvent {
  id: string;
  slug: string;
  platform: Platform;
  cohortId: string | null;
  cohortName: string;
  surface: NormalizedDistributionSurface | "all";
  title: string;
  summary: string;
  state: ShiftState;
  firstDetectedAt: string;
  lastUpdatedAt: string;
  evidenceScore: number; // 0 - 100
  confidenceLabel: ConfidenceLabel;
  scoringVersion: string;
  componentScores: ShiftComponentScores;
  affectedChannelsPercentage: number;
  medianDistributionMovement: number; // percentage e.g. -18.7
  channelsAnalyzed: number;
  distinctOwners: number;
  isPubliclyVisible: boolean;
  suppressionReason: string | null;
  whatChanged: string;
  whereItChanged: string;
  whoAppearsAffected: string;
  metricsThatDidNotChange: string[];
  alternativeExplanations: string[];
  bayesianEvidence?: BayesianChangePointResult;
  surfaceFlowVectors?: SurfaceFlowVector[];
  forensicAutopsy?: ForensicAutopsyReport;
  crossPlatformCorrelations?: CrossPlatformCorrelation[];
  counterfactualSample?: CounterfactualImpact;
  createdAt: string;
  updatedAt: string;
}

export interface ChannelShiftImpact {
  id: string;
  shiftId: string;
  channelId: string;
  classification: ImpactClassification;
  confidenceScore: number; // 0 - 100
  observedDeltaPercentage: number;
  cohortDeltaPercentage: number;
  relativePerformanceDelta: number;
  surfaceImpacts: Record<string, number>;
  counterfactual?: CounterfactualImpact;
  evidenceSummary: string;
  createdAt: string;
}

export interface Recommendation {
  id: string;
  channelId: string;
  shiftId: string | null;
  action: RecommendationAction;
  title: string;
  rationale: string;
  evidencePoints: string[];
  confidence: number;
  suggestedReviewDate: string;
  tacticalSteps?: string[];
  version: string;
  createdAt: string;
}
