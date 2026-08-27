import { describe, it, expect } from "vitest";
import { evaluateShiftEnsemble } from "../src/detection/ensemble-detector.js";

describe("Ensemble Shift Detector & Privacy Invariants", () => {
  it("suppresses public publishing when channel sample size is below threshold (<25)", () => {
    const rawMetrics = Array.from({ length: 15 }, (_, i) => ({
      channelId: `ch_${i}`,
      ownerId: `owner_${i}`,
      viewsDeltaPct: -30,
      zScore: -2.5,
      historyDays: 30,
    }));

    const result = evaluateShiftEnsemble({
      platform: "youtube",
      cohortId: "cohort_test",
      cohortName: "Test Cohort",
      channelDeviations: rawMetrics,
      cohortDailyZScores: [-2.5, -2.7],
      cohortTimeSeriesViews: [80000, 60000],
    });

    expect(result.isPubliclyVisible).toBe(false);
    expect(result.evidenceScore).toBeLessThanOrEqual(45);
  });

  it("suppresses public publishing when distinct owner count is below threshold (<10)", () => {
    const rawMetrics = Array.from({ length: 30 }, (_, i) => ({
      channelId: `ch_${i}`,
      ownerId: `owner_${i % 5}`, // Only 5 distinct owners!
      viewsDeltaPct: -30,
      zScore: -2.5,
      historyDays: 30,
    }));

    const result = evaluateShiftEnsemble({
      platform: "youtube",
      cohortId: "cohort_test",
      cohortName: "Test Cohort",
      channelDeviations: rawMetrics,
      cohortDailyZScores: [-2.5, -2.7],
      cohortTimeSeriesViews: [80000, 60000],
    });

    expect(result.isPubliclyVisible).toBe(false);
    expect(result.evidenceScore).toBeLessThanOrEqual(45);
  });

  it("detects high-confidence shift when both sample, consensus, and owner diversity gates pass", () => {
    const rawMetrics = Array.from({ length: 40 }, (_, i) => ({
      channelId: `ch_${i}`,
      ownerId: `owner_${i}`, // 40 distinct owners
      viewsDeltaPct: -28,
      ctrDeltaPct: 0.2, // Stable CTR
      retentionDeltaPct: -0.1, // Stable retention
      zScore: -2.8,
      historyDays: 30,
      surfaceDeltas: { browse: -32, suggested: 2, search: 0, shorts: -1 },
    }));

    const result = evaluateShiftEnsemble({
      platform: "youtube",
      cohortId: "cohort_finance_macro",
      cohortName: "Finance & Wealth · Macro Band",
      channelDeviations: rawMetrics,
      cohortDailyZScores: [-2.5, -2.8, -3.1],
      cohortTimeSeriesViews: [100000, 95000, 72000],
    });

    expect(result.isPubliclyVisible).toBe(true);
    expect(result.evidenceScore).toBeGreaterThanOrEqual(60);
    expect(result.confidenceLabel).toMatch(/LIKELY_SHIFT|STRONG_SIGNAL/);
  });
});
