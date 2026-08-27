import { describe, it, expect } from "vitest";
import { computeChannelBaseline } from "../src/baseline/baseline-engine.js";

describe("28-Day Baseline Engine", () => {
  it("requires at least 14 days of observations to calculate baseline", () => {
    const shortSeries = Array.from({ length: 10 }, (_, i) => ({
      date: `2026-08-${i + 1 < 10 ? "0" + (i + 1) : i + 1}`,
      value: 1000,
    }));

    const result = computeChannelBaseline(shortSeries);
    expect(result.isReady).toBe(false);
  });

  it("calculates 28-day baseline with day-of-week seasonality decomposition", () => {
    const observations = Array.from({ length: 28 }, (_, i) => {
      const d = new Date(2026, 7, i + 1);
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      return {
        date: d.toISOString().split("T")[0],
        value: isWeekend ? 2000 : 1000,
      };
    });

    const result = computeChannelBaseline(observations);
    expect(result.isReady).toBe(true);
    expect(result.overallMedian).toBeGreaterThan(0);
    expect(result.seasonality).toBeDefined();
  });
});
