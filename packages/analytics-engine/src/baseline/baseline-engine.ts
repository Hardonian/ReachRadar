import {
  median,
  medianAbsoluteDeviation,
  robustZScore,
  calculateVolatility,
} from "../stats/robust-stats.js";
import { MIN_BASELINE_DAYS, STANDARD_BASELINE_WINDOW_DAYS } from "@reachradar/config";

export interface DailyObservation {
  date: string; // YYYY-MM-DD
  value: number;
}

export interface DayOfWeekSeasonality {
  dayOfWeek: number; // 0 = Sun, 1 = Mon, ..., 6 = Sat
  medianMultiplier: number;
  sampleCount: number;
}

export interface BaselineResult {
  isReady: boolean;
  sampleDays: number;
  missingDays: number;
  completenessRatio: number;
  overallMedian: number;
  overallMad: number;
  volatilityScore: number;
  seasonality: Record<number, number>; // dayOfWeek -> multiplier
  expectedValue: number;
  lowerBound: number;
  upperBound: number;
  currentValue: number;
  percentageDelta: number;
  robustZ: number;
  anomalyDetected: boolean;
}

export function computeChannelBaseline(
  history: DailyObservation[],
  currentDate?: string
): BaselineResult {
  if (!history || history.length < MIN_BASELINE_DAYS) {
    const lastVal = history && history.length > 0 ? history[history.length - 1].value : 0;
    return {
      isReady: false,
      sampleDays: history ? history.length : 0,
      missingDays: STANDARD_BASELINE_WINDOW_DAYS - (history ? history.length : 0),
      completenessRatio: history ? history.length / STANDARD_BASELINE_WINDOW_DAYS : 0,
      overallMedian: lastVal,
      overallMad: 0,
      volatilityScore: 0,
      seasonality: { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 },
      expectedValue: lastVal,
      lowerBound: lastVal * 0.7,
      upperBound: lastVal * 1.3,
      currentValue: lastVal,
      percentageDelta: 0,
      robustZ: 0,
      anomalyDetected: false,
    };
  }

  // Use the most recent STANDARD_BASELINE_WINDOW_DAYS (28 days)
  const window = history.slice(-STANDARD_BASELINE_WINDOW_DAYS);
  const values = window.map((d) => d.value);
  const overallMed = median(values);
  const overallMad = Math.max(medianAbsoluteDeviation(values, overallMed), 1e-5);
  const volatility = calculateVolatility(values);

  // Group by day of week
  const byDow: Record<number, number[]> = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
  for (const obs of window) {
    const dow = new Date(obs.date + "T00:00:00Z").getUTCDay();
    byDow[dow].push(obs.value);
  }

  const seasonality: Record<number, number> = {};
  for (let dow = 0; dow <= 6; dow++) {
    const dowValues = byDow[dow];
    if (dowValues.length > 0 && overallMed > 0) {
      const dowMed = median(dowValues);
      seasonality[dow] = Math.max(0.2, Math.min(3.0, dowMed / overallMed));
    } else {
      seasonality[dow] = 1.0;
    }
  }

  // Current observation (last item in history or matching currentDate)
  const currentObs = currentDate
    ? history.find((d) => d.date === currentDate) || history[history.length - 1]
    : history[history.length - 1];

  const currentVal = currentObs.value;
  const currentDow = new Date(currentObs.date + "T00:00:00Z").getUTCDay();
  const dowMultiplier = seasonality[currentDow] ?? 1.0;

  // Expected seasonal value
  const expectedValue = overallMed * dowMultiplier;
  const seasonalMad = overallMad * dowMultiplier;

  // Confidence bounds: median ± 2.5 * MAD (approx ~ 98.7% envelope under normality)
  const lowerBound = Math.max(0, expectedValue - 2.5 * seasonalMad);
  const upperBound = expectedValue + 2.5 * seasonalMad;

  const percentageDelta =
    expectedValue > 0 ? ((currentVal - expectedValue) / expectedValue) * 100 : 0;
  const robustZ = robustZScore(currentVal, expectedValue, seasonalMad);

  // Anomaly flag: robust Z score > 2.0 (standard statistical threshold)
  const anomalyDetected = Math.abs(robustZ) >= 2.0;

  return {
    isReady: true,
    sampleDays: window.length,
    missingDays: Math.max(0, STANDARD_BASELINE_WINDOW_DAYS - window.length),
    completenessRatio: Math.min(1.0, window.length / STANDARD_BASELINE_WINDOW_DAYS),
    overallMedian: overallMed,
    overallMad,
    volatilityScore: volatility,
    seasonality,
    expectedValue,
    lowerBound,
    upperBound,
    currentValue: currentVal,
    percentageDelta,
    robustZ,
    anomalyDetected,
  };
}
