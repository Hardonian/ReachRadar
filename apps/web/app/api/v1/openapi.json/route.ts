import { NextResponse } from "next/server";

export async function GET() {
  const spec = {
    openapi: "3.1.0",
    info: {
      title: "ReachRadar Recommendation Observability API",
      version: "2.0.0",
      description:
        "Commercial-grade REST API for programmatic ingestion, cohort volatility telemetry, shift anomaly detection, and packaging simulation.",
    },
    servers: [{ url: "https://api.reachradar.io/v1" }],
    paths: {
      "/weather": {
        get: {
          summary: "Get Cross-Platform Algorithm Volatility & RAX Index",
          responses: { "200": { description: "Current volatility index by surface & vertical." } },
        },
      },
      "/shifts": {
        get: {
          summary: "List Active & Historical Algorithmic Shifts",
          responses: { "200": { description: "Returns verified public and cohort shifts." } },
        },
      },
      "/ai/simulator": {
        post: {
          summary: "Simulate Packaging Resilience against Current Platform Weather",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    thumbnailDescription: { type: "string" },
                    durationMinutes: { type: "number" },
                    niche: { type: "string" },
                  },
                },
              },
            },
          },
          responses: { "200": { description: "Resilience score, pickup probability, and revisions." } },
        },
      },
      "/ai/copilot": {
        post: {
          summary: "Query Ask Radar Conversational Intelligence Copilot",
          responses: { "200": { description: "Grounded algorithmic diagnosis and strategic citations." } },
        },
      },
      "/alerts/dispatch": {
        post: {
          summary: "Trigger Webhook / Slack / Email Alert Dispatch",
          responses: { "200": { description: "Dispatch results." } },
        },
      },
    },
  };

  return NextResponse.json(spec);
}
