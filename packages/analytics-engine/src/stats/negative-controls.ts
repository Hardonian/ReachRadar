import { median, medianAbsoluteDeviation } from "./robust-stats.js";

export interface NegativeControlVerificationInput {
  searchViewsDeltaPct: number;
  directTrafficDeltaPct: number;
  notificationViewsDeltaPct: number;
  browseViewsDeltaPct: number;
  suggestedViewsDeltaPct: number;
}

export interface NegativeControlAuditResult {
  isFalsifiedAsChannelSpecific: boolean;
  negativeControlStabilityScore: number; // 0 - 100
  controls: Array<{
    metricName: string;
    observedVariancePct: number;
    status: "PASS_INVARIANT" | "FAIL_ANOMALOUS";
    rationale: string;
  }>;
  verdictSummary: string;
}

/**
 * Validates algorithmic shift hypotheses against negative control invariant metrics.
 */
export function auditNegativeControls(
  input: NegativeControlVerificationInput
): NegativeControlAuditResult {
  const {
    searchViewsDeltaPct,
    directTrafficDeltaPct,
    notificationViewsDeltaPct,
    browseViewsDeltaPct,
    suggestedViewsDeltaPct,
  } = input;

  const controls: NegativeControlAuditResult["controls"] = [];

  // Control 1: Search query traffic invariant
  const searchPass = Math.abs(searchViewsDeltaPct) <= 12;
  controls.push({
    metricName: "YouTube Search Queries",
    observedVariancePct: Math.round(searchViewsDeltaPct * 10) / 10,
    status: searchPass ? "PASS_INVARIANT" : "FAIL_ANOMALOUS",
    rationale: searchPass
      ? "Direct user intent search volume is unchanged, confirming underlying audience demand remains intact."
      : "Search traffic also fell, suggesting broad topic interest decay or search indexing shift.",
  });

  // Control 2: Direct / Channel URL navigation invariant
  const directPass = Math.abs(directTrafficDeltaPct) <= 10;
  controls.push({
    metricName: "Direct URL Navigation & Channel Page",
    observedVariancePct: Math.round(directTrafficDeltaPct * 10) / 10,
    status: directPass ? "PASS_INVARIANT" : "FAIL_ANOMALOUS",
    rationale: directPass
      ? "Core habitual subscriber navigation is steady."
      : "Direct traffic exhibited high variance.",
  });

  // Control 3: Notification Click-through Invariant
  const notifPass = Math.abs(notificationViewsDeltaPct) <= 15;
  controls.push({
    metricName: "Subscriber Bell Notifications",
    observedVariancePct: Math.round(notificationViewsDeltaPct * 10) / 10,
    status: notifPass ? "PASS_INVARIANT" : "FAIL_ANOMALOUS",
    rationale: notifPass
      ? "Push notifications deliver baseline reach without algorithmic suppression."
      : "Notification deliveries shifted anomalously.",
  });

  const passes = controls.filter((c) => c.status === "PASS_INVARIANT").length;
  const isAlgorithmicCandidate = (browseViewsDeltaPct <= -12 || suggestedViewsDeltaPct <= -12);

  // If search, direct, and notifications all crashed along with browse, it's NOT an algorithm shift (it's creator upload hiatus, audience churn, or holiday)
  const isFalsifiedAsChannelSpecific = passes === 0 && isAlgorithmicCandidate;

  // Stability score (100 = perfect negative control invariance)
  const avgAbsControlVariance = (Math.abs(searchViewsDeltaPct) + Math.abs(directTrafficDeltaPct) + Math.abs(notificationViewsDeltaPct)) / 3;
  const negativeControlStabilityScore = Math.max(0, Math.min(100, Math.round(100 - avgAbsControlVariance * 3.5)));

  let verdictSummary = "";
  if (isFalsifiedAsChannelSpecific) {
    verdictSummary = "Negative controls failed: Total channel traffic decayed across all intent and passive surfaces, indicating creator-specific factors rather than algorithmic suppression.";
  } else if (passes >= 2 && isAlgorithmicCandidate) {
    verdictSummary = "Negative controls verified: User-initiated intent and direct notifications remain stable while algorithmic recommendation surfaces declined, confirming systemic distribution redistribution.";
  } else {
    verdictSummary = "Negative controls show moderate stability within expected variance bounds.";
  }

  return {
    isFalsifiedAsChannelSpecific,
    negativeControlStabilityScore,
    controls,
    verdictSummary,
  };
}
