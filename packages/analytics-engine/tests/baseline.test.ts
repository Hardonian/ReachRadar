import { describe, it, expect } from "vitest";
import { BaselineEngine } from "../src/baseline/baseline-engine";

describe("28-Day Baseline Engine", () => {
  const engine = new BaselineEngine();

  it("requires at least 14 days of observations to calculate baseline", () => {
    const shortSeries = Array.from({ length: 10 }, (_, i) => ({
      date: `2026-08-${i + 1}`,
      value: 1000,
    }));

    const result = engine.calculateBaseline(shortSeries);
    expect(result.isSufficient).toBe(false);
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

    const result = engine.calculateBaseline(observations);
    expect(result.isSufficient).toBe(true);
    expect(result.median).toBeGreaterThan(0);
    expect(result.dayOfWeekMultipliers).toBeDefined();
  });
});
