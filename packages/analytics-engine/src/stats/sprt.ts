import { SPRT_CONFIG } from "@reachradar/config";
import { median, medianAbsoluteDeviation } from "./robust-stats.js";

export interface SprtResult {
  decision: "SHIFT_DETECTED" | "NO_SHIFT" | "CONTINUE_SAMPLING";
  logLikelihoodRatio: number;
  upperBoundaryA: number;
  lowerBoundaryB: number;
  sampleCount: number;
  detectedAtSampleIndex: number | null;
}

/**
 * Wald's Sequential Probability Ratio Test (SPRT)
 * Tests null hypothesis H0 (baseline distribution: mean = 0, sigma = 1)
 * against alternative hypothesis H1 (mean shift by delta = ±minShiftSigma).
 *
 * Provides mathematically optimal early stopping with bounded Type I (alpha) and Type II (beta) error.
 */
const DEFAULT_SPRT = {
  alpha: 0.01,
  beta: 0.05,
  minShiftSigma: 1.25,
};

export function calculateSprt(
  timeSeries: number[],
  baselineMean?: number,
  baselineStd?: number,
  options: { alpha?: number; beta?: number; deltaSigma?: number } = {}
): SprtResult {
  const alpha = options.alpha ?? (SPRT_CONFIG ? SPRT_CONFIG.alpha : DEFAULT_SPRT.alpha);
  const beta = options.beta ?? (SPRT_CONFIG ? SPRT_CONFIG.beta : DEFAULT_SPRT.beta);
  const deltaSigma = options.deltaSigma ?? (SPRT_CONFIG ? SPRT_CONFIG.minShiftSigma : DEFAULT_SPRT.minShiftSigma);

  // Wald's boundaries
  const upperA = Math.log((1 - beta) / alpha);
  const lowerB = Math.log(beta / (1 - alpha));

  if (!timeSeries || timeSeries.length < 3) {
    return {
      decision: "CONTINUE_SAMPLING",
      logLikelihoodRatio: 0,
      upperBoundaryA: upperA,
      lowerBoundaryB: lowerB,
      sampleCount: timeSeries ? timeSeries.length : 0,
      detectedAtSampleIndex: null,
    };
  }

  const mu0 = baselineMean ?? median(timeSeries);
  const sigma = Math.max(baselineStd ?? (medianAbsoluteDeviation(timeSeries, mu0) * 1.4826), 1e-4);

  // We test two symmetric SPRT arms: downward shift (-delta) and upward shift (+delta)
  let cumulativeLLRPos = 0;
  let cumulativeLLRNeg = 0;
  let detectedIndex: number | null = null;
  let decision: SprtResult["decision"] = "CONTINUE_SAMPLING";

  for (let i = 0; i < timeSeries.length; i++) {
    const x = timeSeries[i];
    const z = (x - mu0) / sigma;

    // Log likelihood increments for Gaussian mean shift
    const delta = deltaSigma;
    const llrPos = delta * z - 0.5 * Math.pow(delta, 2);
    const llrNeg = -delta * z - 0.5 * Math.pow(-delta, 2);

    cumulativeLLRPos += llrPos;
    cumulativeLLRNeg += llrNeg;

    const maxLLR = Math.max(cumulativeLLRPos, cumulativeLLRNeg);

    if (maxLLR >= upperA && detectedIndex === null) {
      decision = "SHIFT_DETECTED";
      detectedIndex = i;
      break;
    } else if (cumulativeLLRPos <= lowerB && cumulativeLLRNeg <= lowerB && i === timeSeries.length - 1) {
      decision = "NO_SHIFT";
    }
  }

  const finalLLR = Math.max(cumulativeLLRPos, cumulativeLLRNeg);

  return {
    decision,
    logLikelihoodRatio: Math.round(finalLLR * 100) / 100,
    upperBoundaryA: Math.round(upperA * 100) / 100,
    lowerBoundaryB: Math.round(lowerB * 100) / 100,
    sampleCount: timeSeries.length,
    detectedAtSampleIndex: detectedIndex,
  };
}
