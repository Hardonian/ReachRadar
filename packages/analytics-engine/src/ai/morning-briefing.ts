import { ExecutiveBriefing, ShiftEvent } from "@reachradar/domain";

export class MorningBriefingEngine {
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY;
  }

  generateBriefing(
    shifts: ShiftEvent[],
    raxIndex: number = 44.8,
    raxDelta: number = 3.2
  ): ExecutiveBriefing {
    const today = new Date().toISOString().split("T")[0];
    const activeShifts = shifts.filter((s) => s.state === "active" || s.state === "developing");

    let globalWeather: ExecutiveBriefing["globalWeatherStatus"] = "CALM";
    if (raxIndex >= 70) globalWeather = "CRITICAL_REDISTRIBUTION";
    else if (raxIndex >= 50) globalWeather = "SEVERE_STORM";
    else if (raxIndex >= 35) globalWeather = "ELEVATED";

    const topShifts = activeShifts.slice(0, 3).map((s) => ({
      shiftId: s.id,
      cohortName: s.cohortName,
      surface: s.surface,
      medianMovementPct: s.medianDistributionMovement,
      evidenceScore: s.evidenceScore,
    }));

    const markdown = `# ReachRadar Executive Morning Dispatch — ${today}
**Composite Volatility (RAX):** ${raxIndex.toFixed(1)} (${raxDelta >= 0 ? "+" : ""}${raxDelta.toFixed(1)} 24h) | **Platform Status:** ${globalWeather}

## Top Distribution Anomalies
${topShifts.map((s) => `- **${s.cohortName}** (${s.surface}): ${s.medianMovementPct > 0 ? "+" : ""}${s.medianMovementPct}% median move (Confidence: ${s.evidenceScore}/100)`).join("\n")}

## Portfolio Risk Exposure
- ⚠️ **Critical Contraction:** 1 channel (Finance / Tech niche)
- 🟡 **Elevated Volatility:** 4 channels
- 🟢 **Stable / Baseline:** 18 channels
- 🚀 **Tailwind Surge:** 3 channels

## Tactical Directive
Recommendation engines are currently consolidating broad browse cold impressions. Roster managers should advise creators to hold core editorial strategies and focus thumbnail packaging strictly on high-affinity core viewers.
`;

    const slackBlocks = {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: `🛰️ ReachRadar Daily Dispatch — RAX: ${raxIndex} (${globalWeather})`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Active Anomalies:* ${topShifts.length} cohorts experiencing confirmed shifts.\n*Top Mover:* ${topShifts[0]?.cohortName || "None"} (${topShifts[0]?.medianMovementPct || 0}%)`,
          },
        },
      ],
    };

    return {
      id: `briefing-${today}`,
      briefingDate: today,
      title: `Algorithm Observability Dispatch — ${today}`,
      headline: `RAX Index ${raxDelta >= 0 ? "rose" : "fell"} to ${raxIndex} amid ${topShifts[0]?.cohortName || "platform-wide"} volatility.`,
      raxCompositeIndex: raxIndex,
      rax24hDelta: raxDelta,
      globalWeatherStatus: globalWeather,
      topActiveShifts: topShifts,
      crossPlatformDivergenceSummary: "YouTube Long-form Browse volatility is elevated (+14%) while Shorts and TikTok distribution curves remain stable.",
      agencyRosterRiskCount: {
        criticalContraction: 1,
        highVolatility: 4,
        stable: 18,
        tailwindSurge: 3,
      },
      keyStrategicTakeaways: [
        "Do not panic-edit titles or thumbnails for videos published within the last 48 hours.",
        "Expect lower cold-impression velocity on Saturday; prime content for Sunday search indexation.",
        "Short-form distribution remains the optimal vector for audience acquisition this week.",
      ],
      markdownFormatted: markdown,
      slackBlockKitFormatted: slackBlocks,
      createdAt: new Date().toISOString(),
    };
  }
}
