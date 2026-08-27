import { describe, it, expect } from "vitest";
import { RecommendationEngine } from "../src/recommendations/recommendation-engine";

describe("Deterministic Recommendation Engine", () => {
  const engine = new RecommendationEngine();

  it("recommends HOLD_STRATEGY when channel drops alongside cohort with stable CTR & retention", () => {
    const rec = engine.generateRecommendation({
      impactClassification: "LIKELY_AFFECTED",
      channelMetrics: {
        viewsDeltaPct: -22,
        ctrDeltaPct: 0.1, // Stable CTR
        retentionDeltaPct: -0.2, // Stable retention
      },
      cohortShift: {
        surface: "browse",
        medianMovement: -24,
        confidence: 85,
      },
    });

    expect(rec.action).toBe("HOLD_STRATEGY");
    expect(rec.confidence).toBeGreaterThanOrEqual(80);
    expect(rec.rationale).toContain("Browse");
  });

  it("recommends REVIEW_PACKAGING when channel views & CTR drop while cohort is stable", () => {
    const rec = engine.generateRecommendation({
      impactClassification: "CHANNEL_SPECIFIC_DECLINE",
      channelMetrics: {
        viewsDeltaPct: -35,
        ctrDeltaPct: -25.0, // CTR collapsed!
        retentionDeltaPct: 0.1,
      },
      cohortShift: null,
    });

    expect(rec.action).toBe("REVIEW_PACKAGING");
    expect(rec.rationale).toContain("CTR");
  });

  it("recommends DOUBLE_DOWN when channel outperforms during a cohort-wide shift", () => {
    const rec = engine.generateRecommendation({
      impactClassification: "OUTPERFORMING_COHORT",
      channelMetrics: {
        viewsDeltaPct: 15,
        ctrDeltaPct: 10.0,
        retentionDeltaPct: 5.0,
      },
      cohortShift: {
        surface: "browse",
        medianMovement: -20,
        confidence: 80,
      },
    });

    expect(rec.action).toBe("DOUBLE_DOWN");
  });
});
