import { InsightNarrator, StructuredEvidence, NarrativeSummary } from "@reachradar/domain";

export class DeterministicNarrator implements InsightNarrator {
  async summarize(evidence: StructuredEvidence): Promise<NarrativeSummary> {
    const isNegative = evidence.medianDeltaPct < 0;
    const directionWord = isNegative ? "Decline" : "Surge";

    const headline = `${evidence.cohortName} · ${evidence.surface.toUpperCase()}: ${Math.abs(evidence.medianDeltaPct).toFixed(1)}% Observed Distribution ${directionWord}`;

    const unchangedSummary =
      evidence.metricsThatDidNotChange.length > 0
        ? ` Importantly, ${evidence.metricsThatDidNotChange.join(", and ")}.`
        : "";

    const executiveSummary =
      `ReachRadar detected a ${evidence.confidenceLabel} distribution shift (${evidence.evidenceScore}/100 confidence) in the ${evidence.cohortName} cohort across YouTube ${evidence.surface}. ` +
      `The median movement is ${evidence.medianDeltaPct > 0 ? "+" : ""}${evidence.medianDeltaPct.toFixed(1)}%, affecting approximately ${evidence.affectedChannelsPct}% of monitored channels across ${evidence.distinctOwners} independent creator accounts.` +
      unchangedSummary;

    const tacticalAdvice =
      `Recommended Action: ${evidence.recommendationAction.replace(/_/g, " ")}. ` +
      `${evidence.recommendationRationale}`;

    return {
      headline,
      executiveSummary,
      tacticalAdvice,
      isAiGenerated: false,
    };
  }
}
