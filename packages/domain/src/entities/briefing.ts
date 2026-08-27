export interface ExecutiveBriefing {
  id: string;
  briefingDate: string; // YYYY-MM-DD
  title: string;
  headline: string;
  raxCompositeIndex: number; // 0 - 100
  rax24hDelta: number;
  globalWeatherStatus: "CALM" | "ELEVATED" | "SEVERE_STORM" | "CRITICAL_REDISTRIBUTION";
  topActiveShifts: Array<{
    shiftId: string;
    cohortName: string;
    surface: string;
    medianMovementPct: number;
    evidenceScore: number;
  }>;
  crossPlatformDivergenceSummary: string;
  agencyRosterRiskCount: {
    criticalContraction: number;
    highVolatility: number;
    stable: number;
    tailwindSurge: number;
  };
  keyStrategicTakeaways: string[];
  markdownFormatted: string;
  slackBlockKitFormatted?: Record<string, any>;
  discordEmbedFormatted?: Record<string, any>;
  createdAt: string;
}
