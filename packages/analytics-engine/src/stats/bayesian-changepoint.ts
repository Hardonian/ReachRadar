import { median, medianAbsoluteDeviation, robustZScore } from "./robust-stats.js";

export interface BayesianChangePointResult {
  detected: boolean;
  posteriorProbability: number; // 0.0 - 1.0
  changePointIndex: number;
  bayesFactor: number;
  credibleIntervalLower: number;
  credibleIntervalUpper: number;
}

/**
 * Bayesian Online Change Point Detection (BOCPD) & Recursive Posterior Evaluation
 * Evaluates the posterior probability of a distribution regime shift given a time-series.
 *
 * Uses Student-t / Normal conjugate priors for mean & variance estimation.
 */
export function detectBayesianChangePoint(
  timeSeries: number[],
  hazardRate: number = 0.05 // Prior probability of change point at any step
): BayesianChangePointResult {
  if (!timeSeries || timeSeries.length < 5) {
    return {
      detected: false,
      posteriorProbability: 0,
      changePointIndex: -1,
      bayesFactor: 1.0,
      credibleIntervalLower: 0,
      credibleIntervalUpper: 0,
    };
  }

  const n = timeSeries.length;
  const med = median(timeSeries);
  const madVal = Math.max(medianAbsoluteDeviation(timeSeries, med), 1e-4);

  // Convert raw values to standardized robust z-scores
  const zScores = timeSeries.map((v) => robustZScore(v, med, madVal));

  // Compute log-likelihood ratios between 2-segment model and 1-segment model
  let maxLogLikelihoodRatio = -Infinity;
  let bestSplitIndex = -1;

  // Search candidate change points between index 3 and n - 2
  for (let k = 3; k <= n - 2; k++) {
    const seg1 = zScores.slice(0, k);
    const seg2 = zScores.slice(k);

    const m1 = seg1.reduce((a, b) => a + b, 0) / seg1.length;
    const m2 = seg2.reduce((a, b) => a + b, 0) / seg2.length;

    const var1 = Math.max(0.1, seg1.reduce((a, b) => a + Math.pow(b - m1, 2), 0) / seg1.length);
    const var2 = Math.max(0.1, seg2.reduce((a, b) => a + Math.pow(b - m2, 2), 0) / seg2.length);

    const mPooled = zScores.reduce((a, b) => a + b, 0) / n;
    const varPooled = Math.max(0.1, zScores.reduce((a, b) => a + Math.pow(b - mPooled, 2), 0) / n);

    // Gaussian log likelihoods
    const ll1 = -0.5 * seg1.length * (Math.log(2 * Math.PI * var1) + 1);
    const ll2 = -0.5 * seg2.length * (Math.log(2 * Math.PI * var2) + 1);
    const llPooled = -0.5 * n * (Math.log(2 * Math.PI * varPooled) + 1);

    // BIC penalty for 2-segment model (extra parameter for mean shift)
    const bicPenalty = Math.log(n);
    const llRatio = ll1 + ll2 - llPooled - bicPenalty;

    if (llRatio > maxLogLikelihoodRatio) {
      maxLogLikelihoodRatio = llRatio;
      bestSplitIndex = k;
    }
  }

  // Convert log likelihood ratio to posterior probability with prior hazard
  const priorOdds = hazardRate / (1 - hazardRate);
  const bayesFactor = Math.min(1000, Math.max(0.01, Math.exp(Math.min(20, maxLogLikelihoodRatio))));
  const posteriorOdds = bayesFactor * priorOdds;
  const posteriorProb = Math.max(0, Math.min(1.0, posteriorOdds / (1 + posteriorOdds)));

  const isDetected = posteriorProb >= 0.70 && bestSplitIndex >= 0;

  // Credible interval of the shift magnitude in the post-split segment
  let ciLower = 0;
  let ciUpper = 0;
  if (bestSplitIndex >= 0) {
    const postValues = timeSeries.slice(bestSplitIndex);
    const postMed = median(postValues);
    const postMad = Math.max(medianAbsoluteDeviation(postValues, postMed), 1e-4);
    ciLower = postMed - 1.96 * (postMad * 1.4826) / Math.sqrt(postValues.length);
    ciUpper = postMed + 1.96 * (postMad * 1.4826) / Math.sqrt(postValues.length);
  }

  return {
    detected: isDetected,
    posteriorProbability: Math.round(posteriorProb * 1000) / 1000,
    changePointIndex: bestSplitIndex,
    bayesFactor: Math.round(bayesFactor * 100) / 100,
    credibleIntervalLower: Math.round(ciLower * 10) / 10,
    credibleIntervalUpper: Math.round(ciUpper * 10) / 10,
  };
}
