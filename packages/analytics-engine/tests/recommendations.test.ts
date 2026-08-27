import { describe, it, expect } from "vitest";
import { generateDeterministicRecommendation } from "../src/recommendations/recommendation-engine.js";

describe("Deterministic Recommendation Engine", () => {
  it("recommends HOLD_STRATEGY when channel drops alongside cohort with stable CTR & retention", () => {
    const rec = generateDeterministicRecommendation({
      channelId: "ch-1",
      shiftId: "shift-1",
      impactClassification: "LIKELY_AFFECTED",
      channelViewsDeltaPct: -22,
      cohortViewsDeltaPct: -24,
      channelCtrDeltaPct: 0.1, // Stable CTR
      channelAvdDeltaPct: -0.2, // Stable retention
      dominantSurface: "Browse",
      shiftConfidenceScore: 85,
    });

    expect(rec.action).toBe("HOLD_STRATEGY");
    expect(rec.confidence).toBeGreaterThanOrEqual(80);
    expect(rec.rationale).toContain("broad matched cohort");
    expect(rec.evidencePoints.some((e) => e.includes("Browse"))).toBe(true);
  });

  it("recommends REVIEW_PACKAGING when channel views & CTR drop while cohort is stable", () => {
    const rec = generateDeterministicRecommendation({
      channelId: "ch-1",
      shiftId: null,
      impactClassification: "CHANNEL_SPECIFIC_DECLINE",
      channelViewsDeltaPct: -35,
      cohortViewsDeltaPct: 0.5,
      channelCtrDeltaPct: -25.0, // CTR collapsed!
      channelAvdDeltaPct: 0.1,
      shiftConfidenceScore: 80,
    });

    expect(rec.action).toBe("REVIEW_PACKAGING");
    expect(rec.rationale).toContain("click-through");
    expect(rec.evidencePoints.some((e) => e.includes("CTR"))).toBe(true);
  });

  it("recommends DOUBLE_DOWN when channel outperforms during a cohort-wide shift", () => {
    const rec = generateDeterministicRecommendation({
      channelId: "ch-1",
      shiftId: "shift-1",
      impactClassification: "OUTPERFORMING_COHORT",
      channelViewsDeltaPct: 15,
      cohortViewsDeltaPct: -20,
      channelCtrDeltaPct: 10.0,
      channelAvdDeltaPct: 5.0,
      dominantSurface: "Browse",
      shiftConfidenceScore: 80,
    });

    expect(rec.action).toBe("DOUBLE_DOWN");
  });
});
