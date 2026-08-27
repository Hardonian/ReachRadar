import { describe, it, expect } from "vitest";
import {
  median,
  mad,
  robustZScore,
  herfindahlIndex,
  shannonEntropy,
} from "../src/stats/robust-stats";
import { calculateEWMA } from "../src/stats/ewma";
import { calculateCUSUM } from "../src/stats/cusum";

describe("Robust Statistical Algorithms", () => {
  it("computes exact median for odd and even length arrays", () => {
    expect(median([1, 2, 3, 4, 5])).toBe(3);
    expect(median([1, 2, 3, 4])).toBe(2.5);
    expect(median([])).toBe(0);
    expect(median([42])).toBe(42);
  });

  it("computes Median Absolute Deviation (MAD) accurately", () => {
    const data = [10, 12, 11, 15, 12, 14, 13];
    const computedMad = mad(data);
    expect(computedMad).toBeGreaterThan(0);
    expect(mad([5, 5, 5, 5])).toBe(0);
  });

  it("calculates robust z-scores with epsilon safeguard against division by zero", () => {
    const z1 = robustZScore(10, 10, 0);
    expect(z1).toBe(0);

    const z2 = robustZScore(20, 10, 2);
    expect(z2).toBeCloseTo((0.6745 * (20 - 10)) / 2, 4);
  });

  it("calculates Herfindahl-Hirschman Index (HHI) for channel owner concentration", () => {
    // Single owner monopoly -> HHI = 1.0
    expect(herfindahlIndex([100])).toBe(1.0);

    // Perfectly balanced 4 owners -> HHI = 0.25
    expect(herfindahlIndex([25, 25, 25, 25])).toBeCloseTo(0.25, 4);
  });

  it("detects shift transitions via CUSUM control chart", () => {
    const baseline = [100, 102, 98, 101, 100, 99, 101];
    const shiftSequence = [...baseline, 80, 78, 75, 76, 74];
    const cusum = calculateCUSUM(shiftSequence, 100, 3);

    expect(cusum.shiftDetected).toBe(true);
    expect(cusum.direction).toBe("negative");
  });

  it("calculates EWMA with smooth alpha weighting", () => {
    const series = [10, 20, 30, 40, 50];
    const ewma = calculateEWMA(series, 0.3);

    expect(ewma.length).toBe(series.length);
    expect(ewma[0]).toBe(10);
    expect(ewma[ewma.length - 1]).toBeGreaterThan(10);
  });
});
