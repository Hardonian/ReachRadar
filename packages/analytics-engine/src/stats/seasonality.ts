import { median, medianAbsoluteDeviation, robustZScore } from "./robust-stats.js";

export interface SeasonalityDecompositionResult {
  trend: number[];
  seasonal: number[];
  residual: number[];
  seasonalityStrength: number; // 0.0 - 1.0
  isSeasonalDip: boolean;
  adjustedAnomalyScore: number; // 0 - 100
}

/**
 * STL-style Robust Seasonal-Trend Decomposition using LOESS / Median filters for 7-day periodicity.
 * Decouples periodic Day-of-Week creator traffic patterns from genuine platform anomalies.
 */
export function decomposeSeasonality(
  timeSeries: number[],
  period: number = 7
): SeasonalityDecompositionResult {
  const n = timeSeries.length;
  if (!timeSeries || n < period * 2) {
    // Insufficient length for full decomposition; return identity
    const med = median(timeSeries || [0]);
    const madVal = medianAbsoluteDeviation(timeSeries || [0], med);
    const lastVal = timeSeries && timeSeries.length > 0 ? timeSeries[timeSeries.length - 1] : 0;
    const z = Math.abs(robustZScore(lastVal, med, madVal));

    return {
      trend: [...(timeSeries || [])],
      seasonal: new Array(n).fill(0),
      residual: new Array(n).fill(0),
      seasonalityStrength: 0,
      isSeasonalDip: false,
      adjustedAnomalyScore: Math.min(100, z * 25),
    };
  }

  // 1. Estimate Trend using 7-day moving median
  const half = Math.floor(period / 2);
  const trend: number[] = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    const start = Math.max(0, i - half);
    const end = Math.min(n, i + half + 1);
    trend[i] = median(timeSeries.slice(start, end));
  }

  // 2. Detrend series
  const detrended = timeSeries.map((v, i) => v - trend[i]);

  // 3. Compute seasonal components per day-of-period (e.g. Day 0 to 6)
  const seasonalMedians: number[] = new Array(period).fill(0);
  for (let d = 0; d < period; d++) {
    const bucket: number[] = [];
    for (let i = d; i < n; i += period) {
      bucket.push(detrended[i]);
    }
    seasonalMedians[d] = median(bucket);
  }

  // Zero-center the seasonal component
  const seasonalMean = seasonalMedians.reduce((a, b) => a + b, 0) / period;
  const centeredSeasonalMedians = seasonalMedians.map((s) => s - seasonalMean);

  // 4. Expand seasonal component to entire series
  const seasonal = timeSeries.map((_, i) => centeredSeasonalMedians[i % period]);

  // 5. Calculate residuals (noise / true anomaly signal)
  const residual = timeSeries.map((v, i) => v - trend[i] - seasonal[i]);

  // 6. Seasonality strength measure: 1 - Var(residual) / Var(detrended)
  const varDetrended = Math.max(
    1e-4,
    detrended.reduce((a, b) => a + Math.pow(b, 2), 0) / n
  );
  const varResidual = Math.max(
    1e-4,
    residual.reduce((a, b) => a + Math.pow(b, 2), 0) / n
  );
  const seasonalityStrength = Math.max(
    0,
    Math.min(1.0, 1 - varResidual / varDetrended)
  );

  // 7. Check if recent observation is merely a seasonal dip
  const latestDetrended = detrended[n - 1];
  const latestSeasonal = seasonal[n - 1];
  const latestResidual = residual[n - 1];

  // If latest value is down, but matches negative seasonal expectation with small residual, it's a seasonal dip
  const isSeasonalDip =
    latestSeasonal < 0 &&
    latestDetrended < 0 &&
    Math.abs(latestResidual) < Math.abs(latestSeasonal) * 0.8;

  // Compute anomaly score purely from the residual component (seasonally adjusted)
  const resMed = median(residual);
  const resMad = Math.max(medianAbsoluteDeviation(residual, resMed), 1e-4);
  const resZ = Math.abs(robustZScore(latestResidual, resMed, resMad));
  const adjustedAnomalyScore = Math.min(100, Math.round(resZ * 28));

  return {
    trend,
    seasonal,
    residual,
    seasonalityStrength: Math.round(seasonalityStrength * 100) / 100,
    isSeasonalDip,
    adjustedAnomalyScore,
  };
}
