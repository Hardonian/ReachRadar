/**
 * Pure, robust statistical functions.
 * Implements median, MAD, robust z-score, rolling stats, entropy, and HHI.
 */

export function median(values: number[]): number {
  if (!values || values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function percentile(values: number[], p: number): number {
  if (!values || values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;
  if (upper >= sorted.length) return sorted[sorted.length - 1];
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

export function mean(values: number[]): number {
  if (!values || values.length === 0) return 0;
  const sum = values.reduce((acc, v) => acc + v, 0);
  return sum / values.length;
}

export function standardDeviation(values: number[], avg?: number): number {
  if (!values || values.length <= 1) return 0;
  const m = avg ?? mean(values);
  const variance = values.reduce((acc, v) => acc + Math.pow(v - m, 2), 0) / (values.length - 1);
  return Math.sqrt(variance);
}

/**
 * Median Absolute Deviation (MAD)
 * Standard scale factor for normal distribution consistency: 1.4826
 */
export function medianAbsoluteDeviation(values: number[], med?: number): number {
  if (!values || values.length === 0) return 0;
  const m = med ?? median(values);
  const absoluteDeviations = values.map((v) => Math.abs(v - m));
  return median(absoluteDeviations);
}

/**
 * Robust Z-Score using Median and MAD.
 * Includes minimum MAD floor safeguard (1e-5) to prevent division by zero in constant series.
 * Formula: 0.6745 * (x - median) / MAD
 */
export function robustZScore(
  value: number,
  med: number,
  mad: number,
  madEpsilon = 1e-5
): number {
  const safeMad = Math.max(mad, madEpsilon);
  return (0.6745 * (value - med)) / safeMad;
}

/**
 * Rolling median calculation with bounded window.
 */
export function rollingMedian(series: number[], windowSize: number): number[] {
  if (!series || series.length === 0) return [];
  const result: number[] = [];
  for (let i = 0; i < series.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const window = series.slice(start, i + 1);
    result.push(median(window));
  }
  return result;
}

/**
 * Rolling mean calculation with bounded window.
 */
export function rollingMean(series: number[], windowSize: number): number[] {
  if (!series || series.length === 0) return [];
  const result: number[] = [];
  for (let i = 0; i < series.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const window = series.slice(start, i + 1);
    result.push(mean(window));
  }
  return result;
}

/**
 * Calculates normalized volatility of a series (normalized MAD / median).
 */
export function calculateVolatility(series: number[]): number {
  if (!series || series.length < 3) return 0;
  const med = median(series);
  if (med <= 0) return 0;
  const mad = medianAbsoluteDeviation(series, med);
  return Math.min(100, (mad / med) * 100);
}

/**
 * Herfindahl-Hirschman Index (HHI) for market / owner concentration.
 * Sum of squares of owner market shares (range 0 to 1).
 * High HHI (> 0.35) means a single owner dominates the cohort.
 */
export function calculateHerfindahlIndex(shares: number[]): number {
  if (!shares || shares.length === 0) return 1.0;
  const total = shares.reduce((a, b) => a + b, 0);
  if (total <= 0) return 1.0;
  return shares.reduce((acc, s) => acc + Math.pow(s / total, 2), 0);
}

/**
 * Normalized Shannon Entropy to evaluate sample diversity across categories or owners.
 * Range: 0 (completely concentrated) to 1.0 (uniform diversity).
 */
export function calculateShannonEntropy(counts: number[]): number {
  if (!counts || counts.length <= 1) return 0;
  const total = counts.reduce((a, b) => a + b, 0);
  if (total <= 0) return 0;
  let entropy = 0;
  for (const c of counts) {
    if (c > 0) {
      const p = c / total;
      entropy -= p * Math.log2(p);
    }
  }
  const maxEntropy = Math.log2(counts.length);
  return maxEntropy > 0 ? entropy / maxEntropy : 0;
}

export const mad = medianAbsoluteDeviation;
export const herfindahlIndex = calculateHerfindahlIndex;
export const shannonEntropy = calculateShannonEntropy;

