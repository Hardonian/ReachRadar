import { NextResponse } from "next/server";
import { DEMO_PUBLIC_SHIFTS, DEMO_CHANNELS } from "@reachradar/providers";
import { CopilotQueryRequest, CopilotQueryResponse } from "@reachradar/domain";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CopilotQueryRequest;
    const { query = "", history = [] } = body;
    const startTime = Date.now();

    const apiKey = process.env.GEMINI_API_KEY;

    // Grounding context from active shifts & channels
    const activeShifts = DEMO_PUBLIC_SHIFTS;
    const channels = DEMO_CHANNELS;

    const context = `
CURRENT MONITORED PLATFORM CONTEXT:
- ReachRadar Algorithm Index (RAX): 44.8 (+3.2 24h) - Elevated Volatility
- Active Confirmed Shifts:
  ${activeShifts
    .map(
      (s) =>
        `* ${s.cohortName} (Surface: ${s.surface}): Movement ${s.medianDistributionMovement}%, Affected: ${s.affectedChannelsPercentage}% of channels, Confidence: ${s.evidenceScore}/100 (${s.confidenceLabel})`
    )
    .join("\n  ")}
- Monitored Channels: ${channels.map((c) => `${c.title} (${c.niche}, ${c.subscriberCount} subs)`).join(", ")}
- Strict Grounding Invariant: Never claim to possess secret Google ranking weights; explain shifts strictly using cohort consensus, surface redistribution, and negative control evidence.
`;

    if (apiKey) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const systemInstruction = `You are "Ask Radar", an elite algorithmic observability copilot for ReachRadar.
Provide crisp, authoritative, statistical responses grounded purely in the provided context.
Output JSON matching schema:
{
  "reply": string,
  "citations": [{"type": "cohort"|"shift"|"channel"|"weather", "id": string, "title": string}],
  "suggestedFollowUps": string[]
}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `${systemInstruction}\n\nCONTEXT:\n${context}\n\nUSER INQUIRY:\n${query}\n\nCHAT HISTORY:\n${JSON.stringify(history)}`,
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          return NextResponse.json<CopilotQueryResponse>({
            reply: parsed.reply,
            citations: parsed.citations || [
              {
                type: "shift",
                id: activeShifts[0].id,
                title: activeShifts[0].title,
              },
            ],
            suggestedFollowUps: parsed.suggestedFollowUps || [
              "What is the recommended tactical action?",
              "Are negative controls passing?",
            ],
            injectedContextSummary: `${activeShifts.length} active shifts grounded.`,
            executionTimeMs: Date.now() - startTime,
          });
        }
      }
    }

    // Deterministic High-Fidelity Fallback
    let reply = `Based on real-time cohort telemetry, the **ReachRadar Algorithm Index (RAX)** is at **44.8** (Elevated Volatility).`;
    if (query.toLowerCase().includes("finance") || query.toLowerCase().includes("browse")) {
      reply = `In the **Finance & Wealth · Macro Band** cohort, we observe a confirmed **-18.7%** Browse distribution contraction affecting 64% of monitored channels. Crucially, content CTR (+0.2%) and AVD (-0.5%) are stable, and Search invariant controls are passing. **Recommended Action: HOLD STRATEGY.**`;
    } else if (query.toLowerCase().includes("shorts")) {
      reply = `The **Shorts · Multi-Niche Feed** cohort is undergoing elevated seed testing exploration (-12.4% median initial velocity). Viewed vs Swiped-away percentage remains consistent at 72%.`;
    } else if (query.toLowerCase().includes("playbook") || query.toLowerCase().includes("strategy")) {
      reply = `For channels facing systemic Browse contraction with stable engagement: **Phase 1 (Days 1–3):** Maintain cadence, do not private videos; **Phase 2 (Days 4–7):** Anchor next 3 titles around high-affinity search keywords; **Phase 3 (Days 8–14):** A/B test thumbnail contrast.`;
    } else {
      reply = `Telemetry confirms **2 active shifts** across monitored cohorts. Distribution movement is concentrated in YouTube **Browse** and **Shorts**. Engagement negative controls confirm user demand is steady.`;
    }

    return NextResponse.json<CopilotQueryResponse>({
      reply,
      citations: [
        {
          type: "shift",
          id: activeShifts[0].id,
          title: activeShifts[0].title,
        },
      ],
      suggestedFollowUps: [
        "Why is Finance Browse reach down this week?",
        "Is my channel outperforming the cohort?",
        "Generate a 14-day hold strategy playbook",
      ],
      injectedContextSummary: `${activeShifts.length} active cohorts analyzed.`,
      executionTimeMs: Date.now() - startTime,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to execute copilot query", message: err.message },
      { status: 500 }
    );
  }
}
