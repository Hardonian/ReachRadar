import { CounterfactualImpact } from "@reachradar/domain";
import { median, medianAbsoluteDeviation } from "../stats/robust-stats.js";

export interface CounterfactualModelingInput {
  channelId: string;
  shiftId: string;
  preShiftViewsHistory: number[]; // 14 to 28 days before shift
  postShiftActualViews: number[]; // days during/after shift
  startDate: string;
  estimatedRpmUsd?: number; // e.g. $4.50 RPM
}

/**
 * Builds a synthetic counterfactual baseline trajectory using pre-shift baseline momentum,
 * estimating the true incremental impact ($Δ\text{Views}$, $Δ\text{Revenue}$) and 95% confidence intervals.
 */
export function calculateCounterfactualImpact(
  input: CounterfactualModelingInput
): CounterfactualImpact {
  const {
    channelId,
    shiftId,
    preShiftViewsHistory,
    postShiftActualViews,
    startDate,
    estimatedRpmUsd = 5.0,
  } = input;

  const preMed = median(preShiftViewsHistory.length > 0 ? preShiftViewsHistory : [10000]);
  const preMad = Math.max(
    medianAbsoluteDeviation(preShiftViewsHistory, preMed),
    preMed * 0.05
  );
  const sigma = preMad * 1.4826;

  // Linear trend in pre-shift history
  const nPre = preShiftViewsHistory.length;
  let slope = 0;
  if (nPre >= 7) {
    const xMean = (nPre - 1) / 2;
    const yMean = preShiftViewsHistory.reduce((a, b) => a + b, 0) / nPre;
    let num = 0;
    let den = 0;
    for (let i = 0; i < nPre; i++) {
      num += (i - xMean) * (preShiftViewsHistory[i] - yMean);
      den += Math.pow(i - xMean, 2);
    }
    slope = den !== 0 ? num / den : 0;
  }

  const dailyTrajectories: CounterfactualImpact["dailyTrajectories"] = [];
  let totalActual = 0;
  let totalExpected = 0;
  let totalCi95Lower = 0;
  let totalCi95Upper = 0;

  const startParsed = new Date(startDate);

  for (let t = 0; t < postShiftActualViews.length; t++) {
    const curDate = new Date(startParsed);
    curDate.setDate(curDate.getDate() + t);
    const dateStr = curDate.toISOString().split("T")[0];

    const actual = postShiftActualViews[t];
    // Expected value continues pre-shift median with slight trend damping
    const expected = Math.max(100, Math.round(preMed + slope * t * 0.8));

    // Confidence intervals widen with time: sigma * sqrt(1 + t/nPre) * 1.96
    const uncertainty = 1.96 * sigma * Math.sqrt(1 + (t + 1) / Math.max(7, nPre));
    const ci95Lower = Math.max(0, Math.round(expected - uncertainty));
    const ci95Upper = Math.round(expected + uncertainty);

    totalActual += actual;
    totalExpected += expected;
    totalCi95Lower += ci95Lower;
    totalCi95Upper += ci95Upper;

    dailyTrajectories.push({
      date: dateStr,
      actual,
      expected,
      ci95Lower,
      ci95Upper,
    });
  }

  const lostOrGainedViews = totalActual - totalExpected;
  const lostOrGainedViewsLowerCI95 = totalActual - totalCi95Upper;
  const lostOrGainedViewsUpperCI95 = totalActual - totalCi95Lower;

  const estimatedRpmImpactUsd = Math.round(((lostOrGainedViews / 1000) * estimatedRpmUsd) * 100) / 100;

  // Recovery velocity: estimate days until actual trajectory intersects expected baseline
  let recoveryDays = 14;
  if (postShiftActualViews.length >= 3) {
    const last3Actual = postShiftActualViews.slice(-3);
    const avgRecent = last3Actual.reduce((a, b) => a + b, 0) / 3;
    const deficitPct = preMed > 0 ? (preMed - avgRecent) / preMed : 0;
    recoveryDays = Math.max(3, Math.min(60, Math.round(deficitPct * 30 + 7)));
  }

  const endParsed = new Date(startParsed);
  endParsed.setDate(endParsed.getDate() + Math.max(0, postShiftActualViews.length - 1));

  return {
    channelId,
    shiftId,
    startDate,
    endDate: endParsed.toISOString().split("T")[0],
    actualViews: totalActual,
    counterfactualExpectedViews: totalExpected,
    lostOrGainedViews,
    lostOrGainedViewsLowerCI95,
    lostOrGainedViewsUpperCI95,
    estimatedRpmImpactUsd,
    recoveryVelocityDays: recoveryDays,
    dailyTrajectories,
  };
}
