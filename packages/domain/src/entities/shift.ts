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
  version: string;
  createdAt: string;
}
