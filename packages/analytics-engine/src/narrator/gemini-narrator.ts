import { InsightNarrator, StructuredEvidence, NarrativeSummary } from "@reachradar/domain";
import { DeterministicNarrator } from "./deterministic-narrator.js";

export class GeminiNarrator implements InsightNarrator {
  private apiKey?: string;
  private fallback: DeterministicNarrator;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
    this.fallback = new DeterministicNarrator();
  }

  async summarize(evidence: StructuredEvidence): Promise<NarrativeSummary> {
    if (!this.apiKey) {
      return this.fallback.summarize(evidence);
    }

    try {
      // Direct REST call to Gemini 1.5/2.0 API with structured output
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
      const prompt = `You are a financial-terminal-grade analytics writer for ReachRadar.
Your task is to summarize the following structured statistical evidence regarding an observed YouTube distribution shift into a concise executive summary and tactical recommendation.

STRICT INVARIANTS:
1. Ground your text ONLY in the provided evidence.
2. DO NOT invent platform algorithm details, internal YouTube code/model names, or claims not provided in the input.
3. DO NOT claim to know proprietary YouTube ranking weights.
4. Output valid JSON matching the schema: {"headline": string, "executiveSummary": string, "tacticalAdvice": string}

EVIDENCE:
${JSON.stringify(evidence, null, 2)}
`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.1,
          },
        }),
      });

      if (!response.ok) {
        return this.fallback.summarize(evidence);
      }

      const data = (await response.json()) as any;
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        return this.fallback.summarize(evidence);
      }

      const parsed = JSON.parse(text);
      return {
        headline: parsed.headline || `${evidence.cohortName}: Observed Shift`,
        executiveSummary: parsed.executiveSummary,
        tacticalAdvice: parsed.tacticalAdvice,
        isAiGenerated: true,
      };
    } catch {
      // Degrade gracefully on any network or parsing error
      return this.fallback.summarize(evidence);
    }
  }
}
