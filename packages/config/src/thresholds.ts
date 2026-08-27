/**
 * Core statistical, privacy, and taxonomy thresholds.
 */

// Privacy & Sample Invariants (Non-negotiable)
export const MIN_PUBLIC_CHANNELS = 25;
export const MIN_DISTINCT_OWNERS = 10;
export const MIN_BASELINE_DAYS = 14;
export const STANDARD_BASELINE_WINDOW_DAYS = 28;
export const MAX_HERFINDAHL_OWNER_INDEX = 0.35; // Maximum concentration allowed for public score

// Algorithm Volatility Taxonomy (0 - 100)
export type WeatherStatus =
  | "CALM"
  | "NORMAL"
  | "ACTIVE"
  | "ELEVATED"
  | "MAJOR_MOVEMENT";

export interface WeatherStatusInfo {
  status: WeatherStatus;
  label: string;
  minScore: number;
  maxScore: number;
  colorClass: string;
  bgClass: string;
  badgeClass: string;
  description: string;
}

export const WEATHER_TAXONOMY: Record<WeatherStatus, WeatherStatusInfo> = {
  CALM: {
    status: "CALM",
    label: "Calm",
    minScore: 0,
    maxScore: 19,
    colorClass: "text-emerald-400",
    bgClass: "bg-emerald-500/10 border-emerald-500/20",
    badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    description: "Recommendation patterns within baseline volatility.",
  },
  NORMAL: {
    status: "NORMAL",
    label: "Normal",
    minScore: 20,
    maxScore: 39,
    colorClass: "text-sky-400",
    bgClass: "bg-sky-500/10 border-sky-500/20",
    badgeClass: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    description: "Typical distribution variance across monitored cohorts.",
  },
  ACTIVE: {
    status: "ACTIVE",
    label: "Active",
    minScore: 40,
    maxScore: 59,
    colorClass: "text-amber-400",
    bgClass: "bg-amber-500/10 border-amber-500/20",
    badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    description: "Measurable movement concentrated in specific surfaces or niches.",
  },
  ELEVATED: {
    status: "ELEVATED",
    label: "Elevated Volatility",
    minScore: 60,
    maxScore: 79,
    colorClass: "text-orange-400",
    bgClass: "bg-orange-500/10 border-orange-500/20",
    badgeClass: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    description: "Widespread anomalous shifts deviating from expected baselines.",
  },
  MAJOR_MOVEMENT: {
    status: "MAJOR_MOVEMENT",
    label: "Major Movement",
    minScore: 80,
    maxScore: 100,
    colorClass: "text-rose-400",
    bgClass: "bg-rose-500/10 border-rose-500/20",
    badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    description: "Systemic multi-cohort redistribution with high statistical confidence.",
  },
};

export function getWeatherStatus(score: number): WeatherStatusInfo {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  if (clamped <= 19) return WEATHER_TAXONOMY.CALM;
  if (clamped <= 39) return WEATHER_TAXONOMY.NORMAL;
  if (clamped <= 59) return WEATHER_TAXONOMY.ACTIVE;
  if (clamped <= 79) return WEATHER_TAXONOMY.ELEVATED;
  return WEATHER_TAXONOMY.MAJOR_MOVEMENT;
}

// Shift Evidence Confidence Labels
export type ConfidenceLabel =
  | "LOW_SIGNAL"
  | "WATCH"
  | "LIKELY_SHIFT"
  | "STRONG_SIGNAL";

export interface ConfidenceLabelInfo {
  label: ConfidenceLabel;
  displayText: string;
  minScore: number;
  maxScore: number;
  badgeClass: string;
}

export const CONFIDENCE_LABELS: Record<ConfidenceLabel, ConfidenceLabelInfo> = {
  LOW_SIGNAL: {
    label: "LOW_SIGNAL",
    displayText: "LOW SIGNAL",
    minScore: 0,
    maxScore: 39,
    badgeClass: "bg-zinc-800 text-zinc-300 border-zinc-700",
  },
  WATCH: {
    label: "WATCH",
    displayText: "WATCH",
    minScore: 40,
    maxScore: 59,
    badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  LIKELY_SHIFT: {
    label: "LIKELY_SHIFT",
    displayText: "LIKELY SHIFT",
    minScore: 60,
    maxScore: 79,
    badgeClass: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  },
  STRONG_SIGNAL: {
    label: "STRONG_SIGNAL",
    displayText: "STRONG SIGNAL",
    minScore: 80,
    maxScore: 100,
    badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  },
};

export function getConfidenceLabel(score: number): ConfidenceLabelInfo {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  if (clamped <= 39) return CONFIDENCE_LABELS.LOW_SIGNAL;
  if (clamped <= 59) return CONFIDENCE_LABELS.WATCH;
  if (clamped <= 79) return CONFIDENCE_LABELS.LIKELY_SHIFT;
  return CONFIDENCE_LABELS.STRONG_SIGNAL;
}

// Scoring Weights Version 2.0.0 (Ensemble with Bayesian & Negative Controls)
export const SCORING_VERSION = "2.0.0";
export const SCORING_WEIGHTS = {
  effectMagnitude: 0.18,
  cohortConsensus: 0.18,
  persistence: 0.14,
  bayesianConfidence: 0.12,
  negativeControlStability: 0.10,
  sampleQuality: 0.08,
  ownerDiversity: 0.08,
  crossMetricCoherence: 0.06,
  surfaceConcentration: 0.06,
} as const;

// ReachRadar Algorithm Index (RAX) Configuration
export const RAX_WEIGHTS = {
  youtubeBrowse: 0.35,
  youtubeSuggested: 0.25,
  youtubeShorts: 0.20,
  tiktokFeed: 0.10,
  instagramReels: 0.10,
} as const;

// Sequential Probability Ratio Test (SPRT) Default Thresholds
export const SPRT_CONFIG = {
  alpha: 0.01, // Type I error (false positive target: 1%)
  beta: 0.05, // Type II error (false negative target: 5%)
  minShiftSigma: 1.25, // Effect size in standard deviations
} as const;

// Data Quality Tiers
export type DataQualityTier = "HIGH" | "GOOD" | "LIMITED" | "INSUFFICIENT";
