import { evaluateShiftEnsemble, EnsembleDetectionInput, ChannelDeviationInput } from "../detection/ensemble-detector.js";
import { computeChannelBaseline, DailyObservation } from "../baseline/baseline-engine.js";

export interface ScenarioTestResult {
  scenarioId: string;
  name: string;
  description: string;
  expectedShift: boolean;
  actualShift: boolean;
  expectedSurface?: string;
  actualSurface?: string;
  evidenceScore: number;
  confidenceLabel: string;
  isPubliclyVisible: boolean;
  suppressionReason: string | null;
  passed: boolean;
  details: string;
}

export interface BacktestSuiteSummary {
  totalScenarios: number;
  passedCount: number;
  failedCount: number;
  truePositives: number;
  falsePositives: number;
  trueNegatives: number;
  falseNegatives: number;
  precision: number;
  recall: number;
  accuracy: number;
  executedAt: string;
  results: ScenarioTestResult[];
}

export class BacktestHarness {
  runAllScenarios(): BacktestSuiteSummary {
    const results: ScenarioTestResult[] = [
      this.testStationaryNoise(),
      this.testSingleChannelDrop(),
      this.testCohortWideBrowseDecline(),
      this.testTopicDemandShock(),
      this.testInsufficientSampleSize(),
      this.testTransientSingleDaySpike(),
      this.testSustainedStepChange(),
      this.testShortsElevatedVolatility(),
      this.testHighOwnerConcentration(),
      this.testMissingObservationsRobustness(),
    ];

    let tp = 0;
    let fp = 0;
    let tn = 0;
    let fn = 0;

    for (const r of results) {
      if (r.expectedShift && r.actualShift) tp++;
      else if (!r.expectedShift && r.actualShift) fp++;
      else if (!r.expectedShift && !r.actualShift) tn++;
      else if (r.expectedShift && !r.actualShift) fn++;
    }

    const passedCount = results.filter((r) => r.passed).length;
    const precision = tp + fp > 0 ? tp / (tp + fp) : 1.0;
    const recall = tp + fn > 0 ? tp / (tp + fn) : 1.0;
    const accuracy = results.length > 0 ? (tp + tn) / results.length : 1.0;

    return {
      totalScenarios: results.length,
      passedCount,
      failedCount: results.length - passedCount,
      truePositives: tp,
      falsePositives: fp,
      trueNegatives: tn,
      falseNegatives: fn,
      precision: Math.round(precision * 1000) / 1000,
      recall: Math.round(recall * 1000) / 1000,
      accuracy: Math.round(accuracy * 1000) / 1000,
      executedAt: new Date().toISOString(),
      results,
    };
  }

  // 1. Stationary Noise: 30 channels with normal ~3-5% daily fluctuation
  private testStationaryNoise(): ScenarioTestResult {
    const channels: ChannelDeviationInput[] = [];
    for (let i = 0; i < 30; i++) {
      channels.push({
        channelId: `ch-${i}`,
        ownerId: `owner-${i}`,
        viewsDeltaPct: (Math.sin(i * 1.5) * 4), // -4% to +4%
        ctrDeltaPct: (Math.cos(i) * 2),
        retentionDeltaPct: 0,
        surfaceDeltas: { browse: 1, suggested: -1, search: 0, shorts: 2 },
        zScore: 0.3,
        historyDays: 30,
      });
    }

    const input: EnsembleDetectionInput = {
      platform: "youtube",
      cohortId: "cohort-test-1",
      cohortName: "Tech Reviews",
      channelDeviations: channels,
      cohortDailyZScores: [0.1, 0.2, -0.1, 0.3, 0.1],
      cohortTimeSeriesViews: [10000, 10100, 9950, 10050, 10020],
      externalDemandCorrelation: 0.1,
    };

    const res = evaluateShiftEnsemble(input);
    const passed = !res.shiftDetected && res.evidenceScore < 40;

    return {
      scenarioId: "SCENARIO_1_STATIONARY_NOISE",
      name: "Stationary Baseline Noise",
      description: "Normal variance across 30 channels should produce no platform shift and Calm/Normal score.",
      expectedShift: false,
      actualShift: res.shiftDetected,
      evidenceScore: res.evidenceScore,
      confidenceLabel: res.confidenceLabel,
      isPubliclyVisible: res.isPubliclyVisible,
      suppressionReason: res.suppressionReason,
      passed,
      details: `Evidence Score: ${res.evidenceScore}, Confidence: ${res.confidenceLabel}`,
    };
  }

  // 2. Single Channel Drop: 1 channel drops -40%, other 29 channels remain stable
  private testSingleChannelDrop(): ScenarioTestResult {
    const channels: ChannelDeviationInput[] = [];
    channels.push({
      channelId: "ch-failing",
      ownerId: "owner-failing",
      viewsDeltaPct: -40,
      ctrDeltaPct: -15,
      retentionDeltaPct: -10,
      surfaceDeltas: { browse: -45, suggested: -35, search: -5, shorts: -10 },
      zScore: -3.8,
      historyDays: 30,
    });

    for (let i = 1; i < 30; i++) {
      channels.push({
        channelId: `ch-${i}`,
        ownerId: `owner-${i}`,
        viewsDeltaPct: (Math.sin(i) * 3), // stable ±3%
        ctrDeltaPct: 0,
        retentionDeltaPct: 0,
        surfaceDeltas: { browse: 0, suggested: 1, search: 0, shorts: 0 },
        zScore: 0.2,
        historyDays: 30,
      });
    }

    const input: EnsembleDetectionInput = {
      platform: "youtube",
      cohortId: "cohort-test-2",
      cohortName: "Gaming Let's Play",
      channelDeviations: channels,
      cohortDailyZScores: [0.1, 0.1, 0.0, -0.2, -0.1],
      cohortTimeSeriesViews: [50000, 49800, 50200, 49900, 49700],
    };

    const res = evaluateShiftEnsemble(input);
    const passed = !res.shiftDetected && res.evidenceScore < 40;

    return {
      scenarioId: "SCENARIO_2_SINGLE_CHANNEL_DROP",
      name: "Single Channel Drop",
      description: "One channel failing -40% while cohort is steady should NOT register as a cohort shift.",
      expectedShift: false,
      actualShift: res.shiftDetected,
      evidenceScore: res.evidenceScore,
      confidenceLabel: res.confidenceLabel,
      isPubliclyVisible: res.isPubliclyVisible,
      suppressionReason: res.suppressionReason,
      passed,
      details: `Median delta: ${res.medianDistributionMovement}%, Evidence Score: ${res.evidenceScore}`,
    };
  }

  // 3. Cohort-Wide Browse Decline: 65% of large finance channels lose Browse impressions while CTR/retention stable
  private testCohortWideBrowseDecline(): ScenarioTestResult {
    const channels: ChannelDeviationInput[] = [];
    for (let i = 0; i < 32; i++) {
      const isAffected = i < 22; // ~68% affected
      channels.push({
        channelId: `ch-${i}`,
        ownerId: `owner-${i}`,
        viewsDeltaPct: isAffected ? -18 - (i % 5) : 2 - (i % 4),
        ctrDeltaPct: 0.5, // CTR stable!
        retentionDeltaPct: -0.2, // retention stable!
        surfaceDeltas: {
          browse: isAffected ? -26 : 0,
          suggested: -2,
          search: 1,
          shorts: 0,
        },
        zScore: isAffected ? -2.6 : 0.1,
        historyDays: 30,
      });
    }

    const input: EnsembleDetectionInput = {
      platform: "youtube",
      cohortId: "cohort-test-3",
      cohortName: "Finance & Wealth",
      channelDeviations: channels,
      cohortDailyZScores: [-2.1, -2.4, -2.7, -2.9], // 4 consecutive days
      cohortTimeSeriesViews: [80000, 78000, 66000, 64000, 63000],
      externalDemandCorrelation: 0.05, // Demand independent!
    };

    const res = evaluateShiftEnsemble(input);
    const passed =
      res.shiftDetected &&
      res.evidenceScore >= 75 &&
      res.dominantSurface === "browse" &&
      res.isPubliclyVisible;

    return {
      scenarioId: "SCENARIO_3_COHORT_BROWSE_DECLINE",
      name: "Cohort-Wide Browse Distribution Shift",
      description: "68% of finance channels losing Browse impressions with stable CTR must trigger strong shift signal.",
      expectedShift: true,
      actualShift: res.shiftDetected,
      expectedSurface: "browse",
      actualSurface: res.dominantSurface,
      evidenceScore: res.evidenceScore,
      confidenceLabel: res.confidenceLabel,
      isPubliclyVisible: res.isPubliclyVisible,
      suppressionReason: res.suppressionReason,
      passed,
      details: `Dominant: ${res.dominantSurface}, Score: ${res.evidenceScore} (${res.confidenceLabel})`,
    };
  }

  // 4. Topic Demand Shock: Views fall but correlated with external search demand (e.g. tax season ended)
  private testTopicDemandShock(): ScenarioTestResult {
    const channels: ChannelDeviationInput[] = [];
    for (let i = 0; i < 30; i++) {
      channels.push({
        channelId: `ch-${i}`,
        ownerId: `owner-${i}`,
        viewsDeltaPct: -22,
        ctrDeltaPct: -2,
        retentionDeltaPct: 0,
        surfaceDeltas: { browse: -20, suggested: -18, search: -25, shorts: -10 },
        zScore: -2.3,
        historyDays: 30,
      });
    }

    const input: EnsembleDetectionInput = {
      platform: "youtube",
      cohortId: "cohort-test-4",
      cohortName: "Tax Preparation",
      channelDeviations: channels,
      cohortDailyZScores: [-2.0, -2.2, -2.4],
      cohortTimeSeriesViews: [40000, 35000, 31000],
      externalDemandCorrelation: 0.88, // Highly correlated with Google search drop!
    };

    const res = evaluateShiftEnsemble(input);
    // Demand independence score should be low (~20), lowering algorithm shift confidence
    const passed = res.componentScores.demandIndependence <= 30;

    return {
      scenarioId: "SCENARIO_4_TOPIC_DEMAND_SHOCK",
      name: "Topic Demand Seasonality Shock",
      description: "When views drop in sync with external search interest, algorithm shift evidence is discounted.",
      expectedShift: false,
      actualShift: res.shiftDetected,
      evidenceScore: res.evidenceScore,
      confidenceLabel: res.confidenceLabel,
      isPubliclyVisible: res.isPubliclyVisible,
      suppressionReason: res.suppressionReason,
      passed,
      details: `Demand independence component: ${res.componentScores.demandIndependence}/100`,
    };
  }

  // 5. Insufficient Sample Size: Only 4 channels exhibit drop
  private testInsufficientSampleSize(): ScenarioTestResult {
    const channels: ChannelDeviationInput[] = [];
    for (let i = 0; i < 4; i++) {
      channels.push({
        channelId: `ch-${i}`,
        ownerId: `owner-${i}`,
        viewsDeltaPct: -30,
        ctrDeltaPct: 0,
        retentionDeltaPct: 0,
        surfaceDeltas: { browse: -35 },
        zScore: -2.5,
        historyDays: 30,
      });
    }

    const input: EnsembleDetectionInput = {
      platform: "youtube",
      cohortId: "cohort-test-5",
      cohortName: "Rare Niche",
      channelDeviations: channels,
      cohortDailyZScores: [-2.5, -2.8],
      cohortTimeSeriesViews: [10000, 7000],
    };

    const res = evaluateShiftEnsemble(input);
    const passed =
      !res.isPubliclyVisible &&
      res.suppressionReason !== null &&
      res.evidenceScore <= 45; // Capped score!

    return {
      scenarioId: "SCENARIO_5_INSUFFICIENT_SAMPLE",
      name: "Privacy & Sample Gate Suppression",
      description: "Sample with only 4 channels must be capped and suppressed from public publication.",
      expectedShift: false,
      actualShift: res.shiftDetected,
      evidenceScore: res.evidenceScore,
      confidenceLabel: res.confidenceLabel,
      isPubliclyVisible: res.isPubliclyVisible,
      suppressionReason: res.suppressionReason,
      passed,
      details: `Suppression: ${res.suppressionReason}, Capped score: ${res.evidenceScore}`,
    };
  }

  // 6. Transient Single Day Spike: 1 day anomaly that doesn't persist
  private testTransientSingleDaySpike(): ScenarioTestResult {
    const channels: ChannelDeviationInput[] = [];
    for (let i = 0; i < 30; i++) {
      channels.push({
        channelId: `ch-${i}`,
        ownerId: `owner-${i}`,
        viewsDeltaPct: 15,
        zScore: 1.8,
        historyDays: 30,
      });
    }

    const input: EnsembleDetectionInput = {
      platform: "youtube",
      cohortId: "cohort-test-6",
      cohortName: "Tech News",
      channelDeviations: channels,
      cohortDailyZScores: [0.1, 0.0, 0.2, 1.8], // only 1 day spike
      cohortTimeSeriesViews: [20000, 20100, 20050, 23000],
    };

    const res = evaluateShiftEnsemble(input);
    const passed = res.componentScores.persistence <= 40;

    return {
      scenarioId: "SCENARIO_6_TRANSIENT_SPIKE",
      name: "Transient 1-Day Movement",
      description: "1-day anomaly without longitudinal survival gets low persistence score.",
      expectedShift: false,
      actualShift: res.shiftDetected,
      evidenceScore: res.evidenceScore,
      confidenceLabel: res.confidenceLabel,
      isPubliclyVisible: res.isPubliclyVisible,
      suppressionReason: res.suppressionReason,
      passed,
      details: `Persistence component: ${res.componentScores.persistence}/100`,
    };
  }

  // 7. Sustained Step Change: Sustained shift over 5 days
  private testSustainedStepChange(): ScenarioTestResult {
    const channels: ChannelDeviationInput[] = [];
    for (let i = 0; i < 28; i++) {
      channels.push({
        channelId: `ch-${i}`,
        ownerId: `owner-${i}`,
        viewsDeltaPct: -20,
        ctrDeltaPct: 1,
        retentionDeltaPct: 0,
        surfaceDeltas: { suggested: -28 },
        zScore: -2.8,
        historyDays: 30,
      });
    }

    const input: EnsembleDetectionInput = {
      platform: "youtube",
      cohortId: "cohort-test-7",
      cohortName: "Science & Education",
      channelDeviations: channels,
      cohortDailyZScores: [-2.1, -2.5, -2.8, -3.0, -3.1],
      cohortTimeSeriesViews: [50000, 48000, 40000, 39500, 39000, 38800],
    };

    const res = evaluateShiftEnsemble(input);
    const passed = res.shiftDetected && res.componentScores.persistence >= 80;

    return {
      scenarioId: "SCENARIO_7_SUSTAINED_STEP",
      name: "Sustained Step Change Detection",
      description: "Longitudinal step change over 5 days achieves maximum persistence and shift detection.",
      expectedShift: true,
      actualShift: res.shiftDetected,
      evidenceScore: res.evidenceScore,
      confidenceLabel: res.confidenceLabel,
      isPubliclyVisible: res.isPubliclyVisible,
      suppressionReason: res.suppressionReason,
      passed,
      details: `Persistence score: ${res.componentScores.persistence}, Evidence: ${res.evidenceScore}`,
    };
  }

  // 8. Shorts Elevated Volatility
  private testShortsElevatedVolatility(): ScenarioTestResult {
    const channels: ChannelDeviationInput[] = [];
    for (let i = 0; i < 35; i++) {
      channels.push({
        channelId: `ch-${i}`,
        ownerId: `owner-${i}`,
        viewsDeltaPct: (i % 2 === 0 ? -24 : 22), // Heavy bimodal shorts swing
        surfaceDeltas: { shorts: i % 2 === 0 ? -38 : 35, browse: 2 },
        zScore: i % 2 === 0 ? -2.4 : 2.2,
        historyDays: 30,
      });
    }

    const input: EnsembleDetectionInput = {
      platform: "youtube",
      cohortId: "cohort-test-8",
      cohortName: "Shorts Fitness",
      channelDeviations: channels,
      cohortDailyZScores: [1.5, -1.8, 2.3, -2.5],
      cohortTimeSeriesViews: [100000, 120000, 85000, 115000],
    };

    const res = evaluateShiftEnsemble(input);
    const passed = res.dominantSurface === "shorts" && res.surfaceMovements.shorts !== undefined;

    return {
      scenarioId: "SCENARIO_8_SHORTS_VOLATILITY",
      name: "Shorts Surface Volatility",
      description: "Severe swings concentrated on Shorts surface correctly identifies Shorts as dominant surface.",
      expectedShift: false,
      actualShift: res.shiftDetected,
      expectedSurface: "shorts",
      actualSurface: res.dominantSurface,
      evidenceScore: res.evidenceScore,
      confidenceLabel: res.confidenceLabel,
      isPubliclyVisible: res.isPubliclyVisible,
      suppressionReason: res.suppressionReason,
      passed,
      details: `Dominant surface: ${res.dominantSurface}`,
    };
  }

  // 9. High Owner Concentration: 30 channels, but 25 belong to one agency
  private testHighOwnerConcentration(): ScenarioTestResult {
    const channels: ChannelDeviationInput[] = [];
    for (let i = 0; i < 30; i++) {
      const ownerId = i < 25 ? "dominant-agency" : `owner-${i}`;
      channels.push({
        channelId: `ch-${i}`,
        ownerId,
        viewsDeltaPct: -25,
        zScore: -2.7,
        historyDays: 30,
      });
    }

    const input: EnsembleDetectionInput = {
      platform: "youtube",
      cohortId: "cohort-test-9",
      cohortName: "Agency Network",
      channelDeviations: channels,
      cohortDailyZScores: [-2.5, -2.7],
      cohortTimeSeriesViews: [90000, 68000],
    };

    const res = evaluateShiftEnsemble(input);
    const passed = !res.isPubliclyVisible && Boolean(res.suppressionReason?.includes("concentration"));

    return {
      scenarioId: "SCENARIO_9_HIGH_CONCENTRATION",
      name: "Owner Concentration Gate",
      description: "Cohorts dominated by a single owner (HHI > 0.35) must be suppressed from public publishing.",
      expectedShift: false,
      actualShift: res.shiftDetected,
      evidenceScore: res.evidenceScore,
      confidenceLabel: res.confidenceLabel,
      isPubliclyVisible: res.isPubliclyVisible,
      suppressionReason: res.suppressionReason,
      passed,
      details: `Suppression Reason: ${res.suppressionReason}`,
    };
  }

  // 10. Missing Observations Robustness
  private testMissingObservationsRobustness(): ScenarioTestResult {
    const history: DailyObservation[] = [];
    // Only 15 days with missing dates
    for (let i = 1; i <= 20; i += 2) {
      history.push({
        date: `2026-08-${i < 10 ? "0" + i : i}`,
        value: 1000 + (i % 3) * 50,
      });
    }

    const baseline = computeChannelBaseline(history);
    const passed =
      baseline.isReady &&
      !isNaN(baseline.expectedValue) &&
      !isNaN(baseline.overallMedian) &&
      baseline.overallMedian > 0;

    return {
      scenarioId: "SCENARIO_10_MISSING_OBSERVATIONS",
      name: "Missing Observations Robustness",
      description: "Intermittent time series with missing dates computes without NaN or runtime exceptions.",
      expectedShift: false,
      actualShift: false,
      evidenceScore: Math.round(baseline.volatilityScore),
      confidenceLabel: "LOW_SIGNAL",
      isPubliclyVisible: true,
      suppressionReason: null,
      passed,
      details: `Median: ${baseline.overallMedian}, Expected: ${baseline.expectedValue}`,
    };
  }
}
