import { RAX_WEIGHTS } from "@reachradar/config";
import { CrossPlatformCorrelation } from "@reachradar/domain";

export interface CrossPlatformVolatilityInput {
  youtubeBrowseVolatility: number; // 0 - 100
  youtubeSuggestedVolatility: number; // 0 - 100
  youtubeShortsVolatility: number; // 0 - 100
  tiktokFeedVolatility: number; // 0 - 100
  instagramReelsVolatility: number; // 0 - 100
}

export interface CrossPlatformAnalysisResult {
  raxCompositeIndex: number; // ReachRadar Algorithm Index (0 - 100)
  rax24hDelta: number;
  marketStatus: "CALM" | "ELEVATED" | "SEVERE_STORM" | "CRITICAL_REDISTRIBUTION";
  correlations: CrossPlatformCorrelation[];
  macroInsight: string;
}

/**
 * Calculates the ReachRadar Algorithm Index (RAX) and cross-platform algorithmic co-volatility.
 */
const DEFAULT_RAX_WEIGHTS = {
  youtubeBrowse: 0.35,
  youtubeSuggested: 0.25,
  youtubeShorts: 0.20,
  tiktokFeed: 0.10,
  instagramReels: 0.10,
};

export function calculateCrossPlatformIndex(
  input: CrossPlatformVolatilityInput,
  previousRaxIndex: number = 42.5
): CrossPlatformAnalysisResult {
  const {
    youtubeBrowseVolatility,
    youtubeSuggestedVolatility,
    youtubeShortsVolatility,
    tiktokFeedVolatility,
    instagramReelsVolatility,
  } = input;

  const weights = RAX_WEIGHTS || DEFAULT_RAX_WEIGHTS;

  // Composite weighted index
  const rax =
    youtubeBrowseVolatility * weights.youtubeBrowse +
    youtubeSuggestedVolatility * weights.youtubeSuggested +
    youtubeShortsVolatility * weights.youtubeShorts +
    tiktokFeedVolatility * weights.tiktokFeed +
    instagramReelsVolatility * weights.instagramReels;

  const roundedRax = Math.round(rax * 10) / 10;
  const delta = Math.round((roundedRax - previousRaxIndex) * 10) / 10;

  let marketStatus: CrossPlatformAnalysisResult["marketStatus"] = "CALM";
  if (roundedRax >= 75) {
    marketStatus = "CRITICAL_REDISTRIBUTION";
  } else if (roundedRax >= 55) {
    marketStatus = "SEVERE_STORM";
  } else if (roundedRax >= 35) {
    marketStatus = "ELEVATED";
  }

  // Cross platform correlations (Shorts vs TikTok vs Reels vs YouTube Long Form)
  const correlations: CrossPlatformCorrelation[] = [
    {
      primaryPlatform: "youtube",
      targetPlatform: "tiktok" as any,
      correlationCoefficient: Math.round(((youtubeShortsVolatility * tiktokFeedVolatility) / 10000) * 100) / 100,
      isCoVolatile: Math.abs(youtubeShortsVolatility - tiktokFeedVolatility) < 18 && youtubeShortsVolatility > 40,
      sharedMacroDrivers: [
        "Short-form retention window adjustment",
        "Swipe-away velocity penalty threshold shift",
      ],
    },
    {
      primaryPlatform: "youtube",
      targetPlatform: "instagram" as any,
      correlationCoefficient: Math.round(((youtubeShortsVolatility * instagramReelsVolatility) / 10000) * 100) / 100,
      isCoVolatile: Math.abs(youtubeShortsVolatility - instagramReelsVolatility) < 18 && youtubeShortsVolatility > 40,
      sharedMacroDrivers: ["Audio trend clustering", "Cross-app content fatigue"],
    },
  ];

  let macroInsight = "Recommendation distribution across platforms is tracking within historical seasonal norms.";
  if (marketStatus === "CRITICAL_REDISTRIBUTION" || marketStatus === "SEVERE_STORM") {
    macroInsight =
      "High co-volatility detected across short-form surfaces (YouTube Shorts, TikTok, Reels), suggesting broad algorithmic re-indexing of content duration and retention curves.";
  } else if (youtubeBrowseVolatility > 60) {
    macroInsight =
      "Volatility is highly isolated to YouTube Long-form Browse, indicating a homepage exploration cycle rather than an ecosystem-wide shift.";
  }

  return {
    raxCompositeIndex: roundedRax,
    rax24hDelta: delta,
    marketStatus,
    correlations,
    macroInsight,
  };
}
