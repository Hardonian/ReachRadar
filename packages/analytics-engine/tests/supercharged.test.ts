import { describe, it, expect } from "vitest";
import {
  detectBayesianChangePoint,
  calculateSprt,
  decomposeSeasonality,
  analyzeSurfaceFlow,
  calculateCrossPlatformIndex,
  auditNegativeControls,
  calculateCounterfactualImpact,
  ShiftSimulatorEngine,
  generateTacticalPlaybook,
  MorningBriefingEngine,
} from "../src/index.js";

describe("Supercharged Analytics & AI Modules", () => {
  it("detects Bayesian change points accurately on step series", () => {
    // 10 stable days followed by 10 dropped days
    const stable = [1000, 1020, 980, 1010, 990, 1005, 995, 1015, 1000, 990];
    const dropped = [700, 680, 710, 690, 705, 695, 700, 685, 710, 690];
    const series = [...stable, ...dropped];

    const result = detectBayesianChangePoint(series);
    expect(result.detected).toBe(true);
    expect(result.posteriorProbability).toBeGreaterThan(0.7);
    expect(result.changePointIndex).toBeGreaterThanOrEqual(7);
  });

  it("evaluates SPRT sequential probability ratio bounds", () => {
    const dropped = [700, 680, 710, 690, 705, 695, 700, 685, 710, 690];
    const sprt = calculateSprt(dropped, 1000, 50);
    expect(sprt.decision).toBe("SHIFT_DETECTED");
  });

  it("decomposes 7-day seasonality and identifies true anomalies", () => {
    // 21 days of synthetic data with weekend drops
    const data = [
      1000, 1050, 1020, 1080, 1100, 800, 750, // week 1
      1010, 1040, 1030, 1070, 1090, 790, 760, // week 2
      1020, 1060, 1010, 1085, 1110, 810, 770, // week 3
    ];
    const result = decomposeSeasonality(data, 7);
    expect(result.trend.length).toBe(21);
    expect(result.seasonal.length).toBe(21);
    expect(result.seasonalityStrength).toBeGreaterThan(0.3);
  });

  it("analyzes multi-surface flow vectors and regime types", () => {
    const flow = analyzeSurfaceFlow({
      browseDeltaPct: -22.5,
      suggestedDeltaPct: 8.4,
      searchDeltaPct: 0.5,
      shortsDeltaPct: -3.2,
      notificationsDeltaPct: 1.1,
    });
    expect(flow.dominantSurfaceMovement).toBe("Browse");
    expect(flow.regimeType).toBe("polarization");
    expect(flow.flowVectors.length).toBeGreaterThan(0);
  });

  it("calculates RAX index and cross-platform correlations", () => {
    const rax = calculateCrossPlatformIndex({
      youtubeBrowseVolatility: 65,
      youtubeSuggestedVolatility: 45,
      youtubeShortsVolatility: 30,
      tiktokFeedVolatility: 35,
      instagramReelsVolatility: 28,
    });
    expect(rax.raxCompositeIndex).toBeGreaterThan(30);
    expect(rax.correlations.length).toBe(2);
  });

  it("audits negative control invariant metrics", () => {
    const audit = auditNegativeControls({
      searchViewsDeltaPct: 2.1,
      directTrafficDeltaPct: -1.0,
      notificationViewsDeltaPct: 0.5,
      browseViewsDeltaPct: -24.0,
      suggestedViewsDeltaPct: -18.0,
    });
    expect(audit.isFalsifiedAsChannelSpecific).toBe(false);
    expect(audit.negativeControlStabilityScore).toBeGreaterThan(80);
  });

  it("computes counterfactual impact trajectories and 95% confidence intervals", () => {
    const pre = [1000, 1020, 990, 1010, 1005, 995, 1015, 1000, 980, 1020, 1010, 990, 1000, 1005];
    const post = [750, 720, 700, 710, 690, 730, 710];
    const impact = calculateCounterfactualImpact({
      channelId: "ch-test",
      shiftId: "shift-test",
      preShiftViewsHistory: pre,
      postShiftActualViews: post,
      startDate: "2026-08-01",
      estimatedRpmUsd: 5.0,
    });
    expect(impact.lostOrGainedViews).toBeLessThan(0);
    expect(impact.estimatedRpmImpactUsd).toBeLessThan(0);
    expect(impact.dailyTrajectories.length).toBe(7);
    expect(impact.dailyTrajectories[0].ci95Upper).toBeGreaterThan(impact.dailyTrajectories[0].ci95Lower);
  });

  it("simulates video packaging resilience against current weather", async () => {
    const simulator = new ShiftSimulatorEngine();
    const result = await simulator.simulatePackaging({
      title: "Why The Global Economy Is Silently Collapsing (Don't Ignore This)",
      thumbnailDescription: "High contrast glowing red map with bold warning text and shocked creator face",
      durationMinutes: 14,
      niche: "finance",
      targetFormat: "long_form",
      primaryHookType: "curiosity_gap",
    }, 65);
    expect(result.resilienceScore).toBeGreaterThan(50);
    expect(result.recommendedRevisions.length).toBe(3);
    expect(result.syntheticDistributionCurve.length).toBeGreaterThan(5);
  });

  it("generates 14-day tactical remediation playbooks", () => {
    const playbook = generateTacticalPlaybook("ch-finance", "HOLD_STRATEGY", "Alpha Market Insights");
    expect(playbook.actionType).toBe("HOLD_STRATEGY");
    expect(playbook.steps.length).toBe(3);
    expect(playbook.steps[0].checklist.length).toBeGreaterThan(0);
  });

  it("generates executive daily dispatches", () => {
    const briefingEngine = new MorningBriefingEngine();
    const briefing = briefingEngine.generateBriefing([], 52.4, 4.1);
    expect(briefing.raxCompositeIndex).toBe(52.4);
    expect(briefing.markdownFormatted).toContain("ReachRadar Executive Morning Dispatch");
  });
});
