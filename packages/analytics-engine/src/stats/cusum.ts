import { median, medianAbsoluteDeviation } from "./robust-stats.js";

/**
 * Cumulative Sum Control Chart (CUSUM) for detecting structural regime shifts / step changes.
 */

export interface CusumResult {
  hasPositiveShift: boolean;
  hasNegativeShift: boolean;
  shiftDetectedIndex: number | null;
  shiftMagnitude: number; // 0 - 100
  positiveCusum: number[];
  negativeCusum: number[];
}

export function calculateCusum(
  series: number[],
  targetMedian?: number,
  targetMad?: number,
  slackK = 0.5,
  thresholdH = 4.0
): CusumResult {
  if (!series || series.length < 5) {
    return {
      hasPositiveShift: false,
      hasNegativeShift: false,
      shiftDetectedIndex: null,
      shiftMagnitude: 0,
      positiveCusum: [],
      negativeCusum: [],
    };
  }

  const med = targetMedian ?? median(series);
  const mad = targetMad ?? Math.max(medianAbsoluteDeviation(series, med), 1e-5);
  const stdEstimate = mad * 1.4826;

  const posCusum: number[] = [];
  const negCusum: number[] = [];

  let sPos = 0;
  let sNeg = 0;
  let shiftIndex: number | null = null;
  let maxExcess = 0;

  for (let i = 0; i < series.length; i++) {
    const z = (series[i] - med) / (stdEstimate || 1);

    sPos = Math.max(0, sPos + z - slackK);
    sNeg = Math.max(0, sNeg - z - slackK);

    posCusum.push(sPos);
    negCusum.push(sNeg);

    if (sPos > thresholdH && shiftIndex === null) {
      shiftIndex = i;
      maxExcess = Math.max(maxExcess, sPos - thresholdH);
    } else if (sNeg > thresholdH && shiftIndex === null) {
      shiftIndex = i;
      maxExcess = Math.max(maxExcess, sNeg - thresholdH);
    }
  }

  const hasPos = posCusum.some((v) => v >= thresholdH);
  const hasNeg = negCusum.some((v) => v >= thresholdH);
  const shiftMagnitude = Math.min(100, (Math.max(sPos, sNeg) / thresholdH) * 50);

  return {
    hasPositiveShift: hasPos,
    hasNegativeShift: hasNeg,
    shiftDetectedIndex: shiftIndex,
    shiftMagnitude,
    positiveCusum: posCusum,
    negativeCusum: negCusum,
  };
}
