export interface PackagingSimulationInput {
  title: string;
  thumbnailDescription: string;
  durationMinutes: number;
  niche: string;
  targetFormat: "long_form" | "shorts" | "podcast" | "live";
  primaryHookType: "curiosity_gap" | "direct_authority" | "controversy_challenge" | "tutorial_utility" | "story_transformation";
  estimatedRetentionRate?: number; // e.g. 55%
  channelBaselineSubscribers?: number;
}

export interface PackagingSimulationResult {
  simulationId: string;
  resilienceScore: number; // 0 - 100
  resilienceTier: "CRITICAL_RISK" | "VULNERABLE" | "STABLE" | "HIGHLY_RESILIENT";
  pickupProbability: number; // 0 - 100%
  expectedDistributionVelocity: "SUPPRESSED" | "BELOW_AVERAGE" | "NORMAL" | "ACCELERATED" | "BREAKOUT";
  currentWeatherContext: {
    nicheVolatility: number;
    dominantSurfaceRisk: string;
    algorithmicRegime: string;
  };
  factorScores: {
    titleClickAffinity: number; // 0 - 100
    thumbnailConceptClarity: number; // 0 - 100
    durationFitUnderCurrentRegime: number; // 0 - 100
    topicSaturationResistance: number; // 0 - 100
    hookRetentionSynergy: number; // 0 - 100
  };
  recommendedRevisions: Array<{
    area: "title" | "thumbnail" | "duration" | "pacing";
    currentFlaw: string;
    tacticalFix: string;
    predictedScoreLift: number;
  }>;
  syntheticDistributionCurve: Array<{
    hour: number;
    projectedImpressionsStandard: number;
    projectedImpressionsUnderVolatileWeather: number;
    projectedImpressionsOptimized: number;
  }>;
  actionSummary: string;
  createdAt: string;
}
