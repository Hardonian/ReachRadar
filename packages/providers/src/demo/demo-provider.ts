import {
  CreatorAnalyticsProvider,
  DiscoveredChannel,
  FetchMetricsParams,
  RawChannelDailyMetric,
  RawTrafficDailyMetric,
  RawVideoDailyMetric,
  TokenRefreshResult,
  YouTubeChannel,
  ShiftEvent,
} from "@reachradar/domain";

export const DEMO_CHANNELS: YouTubeChannel[] = [
  {
    id: "demo-ch-finance-1",
    organizationId: "demo-org-1",
    connectedAccountId: "demo-acc-1",
    platformChannelId: "UC_DEMO_FINANCE_ALPHA",
    title: "Capital Horizon",
    customUrl: "@capitalhorizon",
    thumbnailUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=150&auto=format&fit=crop&q=80",
    publishedAt: "2021-03-15T00:00:00Z",
    country: "US",
    primaryLanguage: "en",
    niche: "finance",
    contentFormat: "long_form",
    sizeBand: "macro",
    subscriberCount: 642000,
    videoCount: 284,
    totalViews: 48500000,
    dataQualityTier: "HIGH",
    baselineStatus: "ready",
    clientGroup: "Alpha Portfolio",
    isDemo: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-08-26T00:00:00Z",
  },
  {
    id: "demo-ch-tech-2",
    organizationId: "demo-org-1",
    connectedAccountId: "demo-acc-1",
    platformChannelId: "UC_DEMO_TECH_BETA",
    title: "Silicon Benchmark",
    customUrl: "@siliconbenchmark",
    thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&auto=format&fit=crop&q=80",
    publishedAt: "2020-08-10T00:00:00Z",
    country: "US",
    primaryLanguage: "en",
    niche: "technology",
    contentFormat: "mixed",
    sizeBand: "mid",
    subscriberCount: 215000,
    videoCount: 195,
    totalViews: 18200000,
    dataQualityTier: "HIGH",
    baselineStatus: "ready",
    clientGroup: "Hardware Group",
    isDemo: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-08-26T00:00:00Z",
  },
  {
    id: "demo-ch-shorts-3",
    organizationId: "demo-org-1",
    connectedAccountId: "demo-acc-1",
    platformChannelId: "UC_DEMO_SHORTS_FITNESS",
    title: "Pulse Kinetics",
    customUrl: "@pulsekinetics",
    thumbnailUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=150&auto=format&fit=crop&q=80",
    publishedAt: "2022-01-20T00:00:00Z",
    country: "GB",
    primaryLanguage: "en",
    niche: "fitness",
    contentFormat: "shorts",
    sizeBand: "macro",
    subscriberCount: 1250000,
    videoCount: 620,
    totalViews: 245000000,
    dataQualityTier: "HIGH",
    baselineStatus: "ready",
    clientGroup: "Shorts Network",
    isDemo: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-08-26T00:00:00Z",
  },
  {
    id: "demo-ch-gaming-4",
    organizationId: "demo-org-1",
    connectedAccountId: "demo-acc-1",
    platformChannelId: "UC_DEMO_GAMING_NEXUS",
    title: "Nexus Play",
    customUrl: "@nexusplay",
    thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&auto=format&fit=crop&q=80",
    publishedAt: "2019-11-05T00:00:00Z",
    country: "CA",
    primaryLanguage: "en",
    niche: "gaming",
    contentFormat: "long_form",
    sizeBand: "mid",
    subscriberCount: 380000,
    videoCount: 450,
    totalViews: 32000000,
    dataQualityTier: "GOOD",
    baselineStatus: "ready",
    clientGroup: "Gaming Roster",
    isDemo: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-08-26T00:00:00Z",
  },
];

export const DEMO_PUBLIC_SHIFTS: ShiftEvent[] = [
  {
    id: "shift-finance-browse-2026",
    slug: "youtube-browse-finance-shift-2026-08-25",
    platform: "youtube",
    cohortId: "cohort-finance-macro",
    cohortName: "Finance & Wealth · Macro Band",
    surface: "browse",
    title: "Systemic Browse Reach Contraction in Finance Cohort",
    summary:
      "A 64% consensus decline in Browse impression allocation observed across macro finance channels, with content-level CTR and AVD remaining steady.",
    state: "active",
    firstDetectedAt: "2026-08-25T14:30:00Z",
    lastUpdatedAt: "2026-08-26T18:00:00Z",
    evidenceScore: 91,
    confidenceLabel: "STRONG_SIGNAL",
    scoringVersion: "1.0.0",
    componentScores: {
      effectMagnitude: 88,
      cohortConsensus: 92,
      persistence: 90,
      sampleQuality: 94,
      ownerDiversity: 89,
      crossMetricCoherence: 95,
      surfaceConcentration: 92,
      demandIndependence: 85,
    },
    affectedChannelsPercentage: 64,
    medianDistributionMovement: -18.7,
    channelsAnalyzed: 48,
    distinctOwners: 29,
    isPubliclyVisible: true,
    suppressionReason: null,
    whatChanged:
      "YouTube Browse features redistributed impressions away from general macroeconomic and market update topics toward focused personal finance guides.",
    whereItChanged: "Concentrated 85% on YouTube Browse Home and Watch Next feeds.",
    whoAppearsAffected: "64% of channels with >250k subscribers in the English finance category.",
    metricsThatDidNotChange: [
      "Click-Through Rate (CTR) essentially unchanged (mean delta: +0.2%)",
      "Average View Duration (AVD) stable across new releases (mean delta: -0.5%)",
      "Search volume for macroeconomic terms within normal seasonal bounds",
    ],
    alternativeExplanations: [
      "Late-summer seasonal audience availability dip",
      "Topic fatigue following heavy market news cycle earlier in the month",
    ],
    createdAt: "2026-08-25T14:30:00Z",
    updatedAt: "2026-08-26T18:00:00Z",
  },
  {
    id: "shift-shorts-volatility-2026",
    slug: "youtube-shorts-elevated-volatility-2026-08-22",
    platform: "youtube",
    cohortId: "cohort-shorts-global",
    cohortName: "Shorts · Multi-Niche Feed",
    surface: "shorts",
    title: "Elevated Shorts Recommendation Volatility & Seed Testing",
    summary:
      "Increased variance in first-hour seed testing audience size across fitness and tech Shorts creators.",
    state: "developing",
    firstDetectedAt: "2026-08-22T09:00:00Z",
    lastUpdatedAt: "2026-08-26T12:00:00Z",
    evidenceScore: 74,
    confidenceLabel: "LIKELY_SHIFT",
    scoringVersion: "1.0.0",
    componentScores: {
      effectMagnitude: 76,
      cohortConsensus: 70,
      persistence: 80,
      sampleQuality: 85,
      ownerDiversity: 82,
      crossMetricCoherence: 65,
      surfaceConcentration: 95,
      demandIndependence: 80,
    },
    affectedChannelsPercentage: 52,
    medianDistributionMovement: -12.4,
    channelsAnalyzed: 82,
    distinctOwners: 54,
    isPubliclyVisible: true,
    suppressionReason: null,
    whatChanged:
      "YouTube Shorts feed expanded exploration testing, causing wider swings in initial impression velocity.",
    whereItChanged: "Exclusively within YouTube Shorts feed distribution.",
    whoAppearsAffected: "Creators posting short-form vertical video under 60 seconds.",
    metricsThatDidNotChange: [
      "Viewed vs Swiped away percentage remains consistent (72% average)",
      "Channel subscriber conversion rate unchanged",
    ],
    alternativeExplanations: [
      "Increased competition from high-volume automated channels in specific sub-niches",
    ],
    createdAt: "2026-08-22T09:00:00Z",
    updatedAt: "2026-08-26T12:00:00Z",
  },
];

export class DemoProvider implements CreatorAnalyticsProvider {
  public readonly platform = "youtube";

  async discoverAccounts(_accessToken: string): Promise<DiscoveredChannel[]> {
    return DEMO_CHANNELS.map((ch) => ({
      platformChannelId: ch.platformChannelId,
      title: ch.title,
      customUrl: ch.customUrl,
      thumbnailUrl: ch.thumbnailUrl,
      publishedAt: ch.publishedAt,
      country: ch.country,
      subscriberCount: ch.subscriberCount,
      videoCount: ch.videoCount,
      totalViews: ch.totalViews,
    }));
  }

  async fetchChannelMetrics(params: FetchMetricsParams): Promise<RawChannelDailyMetric[]> {
    const dates = this.getDateRange(params.startDate, params.endDate);
    const isFinance = params.platformChannelId.includes("FINANCE");

    return dates.map((date, idx) => {
      // Deterministic shift after index 20
      const isShiftPeriod = isFinance && idx >= dates.length - 7;
      const baseViews = isFinance ? 35000 : 18000;
      const seasonal = 1.0 + Math.sin(idx * 0.5) * 0.1;
      const shiftDrop = isShiftPeriod ? 0.813 : 1.0; // -18.7%

      const views = Math.round(baseViews * seasonal * shiftDrop);
      return {
        metricDate: date,
        views,
        estimatedMinutesWatched: Math.round(views * 6.2),
        averageViewDurationSeconds: 372,
        averageViewPercentage: 54.2,
        subscribersGained: Math.round(views * 0.008),
        subscribersLost: Math.round(views * 0.001),
        likes: Math.round(views * 0.045),
        comments: Math.round(views * 0.006),
        shares: Math.round(views * 0.004),
        impressions: Math.round(views * 12),
        impressionsCtr: 8.3,
      };
    });
  }

  async fetchTrafficMetrics(params: FetchMetricsParams): Promise<RawTrafficDailyMetric[]> {
    const dates = this.getDateRange(params.startDate, params.endDate);
    const isFinance = params.platformChannelId.includes("FINANCE");
    const results: RawTrafficDailyMetric[] = [];

    for (let idx = 0; idx < dates.length; idx++) {
      const date = dates[idx];
      const isShiftPeriod = isFinance && idx >= dates.length - 7;

      // Browse
      const browseDrop = isShiftPeriod ? 0.74 : 1.0; // -26% Browse
      results.push({
        metricDate: date,
        surface: "browse",
        rawSourceType: "YT_SUGGESTED_PAGES",
        views: Math.round(18000 * browseDrop),
        estimatedMinutesWatched: Math.round(18000 * 6.5 * browseDrop),
        impressions: Math.round(200000 * browseDrop),
        impressionsCtr: 8.5,
      });

      // Suggested
      results.push({
        metricDate: date,
        surface: "suggested",
        rawSourceType: "RELATED_VIDEO",
        views: 8500,
        estimatedMinutesWatched: 52000,
        impressions: 95000,
        impressionsCtr: 8.2,
      });

      // Search
      results.push({
        metricDate: date,
        surface: "search",
        rawSourceType: "YT_SEARCH",
        views: 5200,
        estimatedMinutesWatched: 32000,
        impressions: 48000,
        impressionsCtr: 9.8,
      });

      // Shorts
      results.push({
        metricDate: date,
        surface: "shorts",
        rawSourceType: "SHORTS",
        views: 3300,
        estimatedMinutesWatched: 12000,
        impressions: 30000,
        impressionsCtr: 7.5,
      });
    }

    return results;
  }

  async fetchVideoMetrics(params: FetchMetricsParams): Promise<RawVideoDailyMetric[]> {
    const dates = this.getDateRange(params.startDate, params.endDate);
    const latestDate = dates[dates.length - 1];

    return [
      {
        platformVideoId: "vid_demo_1",
        metricDate: latestDate,
        views: 24500,
        estimatedMinutesWatched: 152000,
        averageViewDurationSeconds: 380,
        likes: 1200,
        comments: 180,
        shares: 95,
      },
      {
        platformVideoId: "vid_demo_2",
        metricDate: latestDate,
        views: 18200,
        estimatedMinutesWatched: 110000,
        averageViewDurationSeconds: 360,
        likes: 950,
        comments: 120,
        shares: 60,
      },
      {
        platformVideoId: "vid_demo_3",
        metricDate: latestDate,
        views: 12400,
        estimatedMinutesWatched: 75000,
        averageViewDurationSeconds: 395,
        likes: 720,
        comments: 90,
        shares: 45,
      },
    ];
  }

  async refreshCredentials(refreshToken: string): Promise<TokenRefreshResult> {
    return {
      accessToken: `demo_token_${Date.now()}`,
      expiresInSeconds: 3600,
      refreshToken,
    };
  }

  async revoke(_accessToken: string): Promise<void> {
    // No-op
  }

  private getDateRange(startDate: string, endDate: string): string[] {
    const dates: string[] = [];
    const curr = new Date(startDate + "T00:00:00Z");
    const end = new Date(endDate + "T00:00:00Z");

    while (curr <= end) {
      dates.push(curr.toISOString().split("T")[0]);
      curr.setUTCDate(curr.getUTCDate() + 1);
    }
    return dates;
  }
}
