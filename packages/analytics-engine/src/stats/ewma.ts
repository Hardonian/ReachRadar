/**
 * Exponentially Weighted Moving Average (EWMA) for smooth trend and sustained movement detection.
 */

export interface EwmaResult {
  smoothed: number[];
  recentTrend: number; // Slope / delta over last few points
  direction: "up" | "down" | "flat";
  momentum: number; // Normalized momentum 0 - 100
}

export function calculateEwma(series: number[], alpha = 0.2): EwmaResult {
  if (!series || series.length === 0) {
    return { smoothed: [], recentTrend: 0, direction: "flat", momentum: 0 };
  }

  const smoothed: number[] = [];
  let current = series[0];
  smoothed.push(current);

  for (let i = 1; i < series.length; i++) {
    current = alpha * series[i] + (1 - alpha) * current;
    smoothed.push(current);
  }

  if (smoothed.length < 2) {
    return { smoothed, recentTrend: 0, direction: "flat", momentum: 0 };
  }

  const last = smoothed[smoothed.length - 1];
  const prev = smoothed[Math.max(0, smoothed.length - 4)]; // 3-step trend
  const deltaPct = prev !== 0 ? ((last - prev) / Math.abs(prev)) * 100 : 0;

  const direction =
    deltaPct > 3 ? "up" : deltaPct < -3 ? "down" : "flat";
  const momentum = Math.min(100, Math.abs(deltaPct) * 2);

  return {
    smoothed,
    recentTrend: deltaPct,
    direction,
    momentum,
  };
}
