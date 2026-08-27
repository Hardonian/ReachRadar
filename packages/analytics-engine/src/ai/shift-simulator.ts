import {
  PackagingSimulationInput,
  PackagingSimulationResult,
} from "@reachradar/domain";

export class ShiftSimulatorEngine {
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY;
  }

  async simulatePackaging(
    input: PackagingSimulationInput,
    nicheVolatilityScore: number = 55
  ): Promise<PackagingSimulationResult> {
    const fallback = this.simulateDeterministic(input, nicheVolatilityScore);

    if (!this.apiKey) {
      return fallback;
    }

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
      const prompt = `You are the Lead Recommendation Optimization Scientist for ReachRadar.
Evaluate the following YouTube video packaging concept against current platform algorithmic volatility (${nicheVolatilityScore}/100 weather index).

VIDEO CONCEPT:
- Title: "${input.title}"
- Thumbnail Concept: "${input.thumbnailDescription}"
- Duration: ${input.durationMinutes} minutes
- Niche: ${input.niche}
- Format: ${input.targetFormat}
- Hook Style: ${input.primaryHookType}

Calculate a Shift Resilience Score (0-100) and provide 3 precise, actionable revisions.
Output valid JSON matching the schema:
{
  "resilienceScore": number,
  "pickupProbability": number,
  "expectedDistributionVelocity": "SUPPRESSED" | "BELOW_AVERAGE" | "NORMAL" | "ACCELERATED" | "BREAKOUT",
  "factorScores": {
    "titleClickAffinity": number,
    "thumbnailConceptClarity": number,
    "durationFitUnderCurrentRegime": number,
    "topicSaturationResistance": number,
    "hookRetentionSynergy": number
  },
  "recommendedRevisions": [
    {
      "area": "title" | "thumbnail" | "duration" | "pacing",
      "currentFlaw": string,
      "tacticalFix": string,
      "predictedScoreLift": number
    }
  ],
  "actionSummary": string
}
`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        }),
      });

      if (!response.ok) return fallback;

      const data = (await response.json()) as any;
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) return fallback;

      const parsed = JSON.parse(text);

      const score = Math.max(10, Math.min(99, parsed.resilienceScore || fallback.resilienceScore));
      let tier: PackagingSimulationResult["resilienceTier"] = "STABLE";
      if (score >= 80) tier = "HIGHLY_RESILIENT";
      else if (score >= 60) tier = "STABLE";
      else if (score >= 40) tier = "VULNERABLE";
      else tier = "CRITICAL_RISK";

      return {
        ...fallback,
        resilienceScore: score,
        resilienceTier: tier,
        pickupProbability: parsed.pickupProbability || fallback.pickupProbability,
        expectedDistributionVelocity: parsed.expectedDistributionVelocity || fallback.expectedDistributionVelocity,
        factorScores: {
          ...fallback.factorScores,
          ...(parsed.factorScores || {}),
        },
        recommendedRevisions: parsed.recommendedRevisions || fallback.recommendedRevisions,
        actionSummary: parsed.actionSummary || fallback.actionSummary,
      };
    } catch {
      return fallback;
    }
  }

  simulateDeterministic(
    input: PackagingSimulationInput,
    nicheVolatility: number = 55
  ): PackagingSimulationResult {
    // Title evaluation heuristics
    const titleLength = input.title.length;
    const hasNumbers = /\d/.test(input.title);
    const hasStrongCuriosity = /why|how|secret|truth|never|stop|new|worst|best|shocking/i.test(input.title);
    let titleScore = 65;
    if (titleLength >= 35 && titleLength <= 65) titleScore += 15;
    if (hasNumbers) titleScore += 10;
    if (hasStrongCuriosity) titleScore += 10;
    titleScore = Math.min(95, Math.max(30, titleScore));

    // Thumbnail evaluation heuristics
    const thumbLength = input.thumbnailDescription.length;
    const hasHighContrast = /contrast|bold|glow|zoom|face|arrow|clean|dark|minimal/i.test(input.thumbnailDescription);
    let thumbScore = 60;
    if (thumbLength > 20) thumbScore += 15;
    if (hasHighContrast) thumbScore += 15;
    thumbScore = Math.min(95, Math.max(30, thumbScore));

    // Duration fit under current volatility
    let durationScore = 75;
    if (input.durationMinutes >= 8 && input.durationMinutes <= 18) durationScore = 90;
    else if (input.durationMinutes > 30) durationScore = 60;

    const topicScore = Math.max(40, 95 - Math.round(nicheVolatility * 0.4));
    const hookScore = input.primaryHookType === "direct_authority" || input.primaryHookType === "story_transformation" ? 85 : 72;

    const rawScore = (titleScore * 0.25 + thumbScore * 0.25 + durationScore * 0.20 + topicScore * 0.15 + hookScore * 0.15);
    const resilienceScore = Math.round(rawScore);

    let resilienceTier: PackagingSimulationResult["resilienceTier"] = "STABLE";
    if (resilienceScore >= 80) resilienceTier = "HIGHLY_RESILIENT";
    else if (resilienceScore >= 60) resilienceTier = "STABLE";
    else if (resilienceScore >= 40) resilienceTier = "VULNERABLE";
    else resilienceTier = "CRITICAL_RISK";

    const pickupProbability = Math.min(96, Math.max(25, Math.round(resilienceScore * 0.95)));

    let velocity: PackagingSimulationResult["expectedDistributionVelocity"] = "NORMAL";
    if (pickupProbability >= 85) velocity = "BREAKOUT";
    else if (pickupProbability >= 70) velocity = "ACCELERATED";
    else if (pickupProbability <= 40) velocity = "BELOW_AVERAGE";

    // Synthetic distribution curve
    const syntheticCurve = [];
    const baseMultiplier = resilienceScore / 70;
    for (let h = 1; h <= 48; h += 3) {
      const standard = Math.round(1000 * Math.pow(h, 0.85));
      const volatile = Math.round(standard * (1 - (nicheVolatility / 200)));
      const optimized = Math.round(standard * baseMultiplier * 1.35);
      syntheticCurve.push({
        hour: h,
        projectedImpressionsStandard: standard,
        projectedImpressionsUnderVolatileWeather: volatile,
        projectedImpressionsOptimized: optimized,
      });
    }

    return {
      simulationId: `sim-${Date.now()}`,
      resilienceScore,
      resilienceTier,
      pickupProbability,
      expectedDistributionVelocity: velocity,
      currentWeatherContext: {
        nicheVolatility,
        dominantSurfaceRisk: "Browse Homepage Cold Recommendations",
        algorithmicRegime: nicheVolatility > 60 ? "HIGH_VOLATILITY_RETRACTION" : "STABLE_EXPLOITATION",
      },
      factorScores: {
        titleClickAffinity: titleScore,
        thumbnailConceptClarity: thumbScore,
        durationFitUnderCurrentRegime: durationScore,
        topicSaturationResistance: topicScore,
        hookRetentionSynergy: hookScore,
      },
      recommendedRevisions: [
        {
          area: "title",
          currentFlaw: "Title structure relies heavily on implicit curiosity rather than distinct viewer benefit.",
          tacticalFix: `Refine title to: "[Action/Subject]: ${input.title.slice(0, 30)}... (What Changed)" to capture search anchors.`,
          predictedScoreLift: 8,
        },
        {
          area: "thumbnail",
          currentFlaw: "Concept lacks single clear visual focal point for mobile feed scaling.",
          tacticalFix: "Increase background subject isolation and eliminate all secondary text except for 2 high-impact words.",
          predictedScoreLift: 12,
        },
        {
          area: "pacing",
          currentFlaw: "First 30 seconds requires immediate narrative payoff to clear volatile retention thresholds.",
          tacticalFix: "Cut introductory greetings; start directly with the consequence hook within 4 seconds.",
          predictedScoreLift: 10,
        },
      ],
      syntheticDistributionCurve: syntheticCurve,
      actionSummary: `Packaging scored ${resilienceScore}/100 resilience against current ${input.niche} algorithm conditions. Implementing recommended thumbnail clarity fixes will boost estimated recommendation pickup to ${Math.min(98, pickupProbability + 15)}%.`,
      createdAt: new Date().toISOString(),
    };
  }
}
