import { describe, it, expect } from "vitest";
import { EnsembleShiftDetector } from "../src/detection/ensemble-detector";
import { MIN_PUBLIC_CHANNELS, MIN_DISTINCT_OWNERS } from "@reachradar/config";

describe("Ensemble Shift Detector & Privacy Invariants", () => {
  const detector = new EnsembleShiftDetector();

  it("suppresses public publishing when channel sample size is below threshold (<25)", () => {
    const rawMetrics = Array.from({ length: 15 }, (_, i) => ({
      channelId: `ch_${i}`,
      ownerId: `owner_${i}`,
      deltaPercentage: -30,
      baselineStability: 0.9,
    }));

    const result = detector.detectCohortShift({
      cohortId: "cohort_test",
      channelMetrics: rawMetrics,
      surface: "browse",
    });

    expect(result.isPubliclyPublishable).toBe(false);
    expect(result.score).toBeLessThanOrEqual(45);
  });

  it("suppresses public publishing when distinct owner count is below threshold (<10)", () => {
    const rawMetrics = Array.from({ length: 30 }, (_, i) => ({
      channelId: `ch_${i}`,
      ownerId: `owner_${i % 5}`, // Only 5 distinct owners!
      deltaPercentage: -30,
      baselineStability: 0.9,
    }));

    const result = detector.detectCohortShift({
      cohortId: "cohort_test",
      channelMetrics: rawMetrics,
      surface: "browse",
    });

    expect(result.isPubliclyPublishable).toBe(false);
    expect(result.score).toBeLessThanOrEqual(45);
  });

  it("detects high-confidence shift when both sample, consensus, and owner diversity gates pass", () => {
    const rawMetrics = Array.from({ length: 40 }, (_, i) => ({
      channelId: `ch_${i}`,
      ownerId: `owner_${i}`, // 40 distinct owners
      deltaPercentage: -28,
      baselineStability: 0.95,
      ctrDeltaPct: 0.2, // Stable CTR
      retentionDeltaPct: -0.1, // Stable retention
    }));

    const result = detector.detectCohortShift({
      cohortId: "cohort_finance_macro",
      channelMetrics: rawMetrics,
      surface: "browse",
    });

    expect(result.isPubliclyPublishable).toBe(true);
    expect(result.score).toBeGreaterThanOrEqual(60);
    expect(result.confidenceLabel).toMatch(/LIKELY_SHIFT|STRONG_SIGNAL/);
  });
});
