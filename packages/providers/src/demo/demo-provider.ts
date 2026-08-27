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
    bayesianEvidence: {
      detected: true,
      posteriorProbability: 0.96,
      changePointIndex: 14,
      changePointDate: "2026-08-25",
      credibleIntervalLower: -23.4,
      credibleIntervalUpper: -14.1,
      bayesFactor: 24.5,
    },
    surfaceFlowVectors: [
      {
        sourceSurface: "Browse Home",
        targetSurface: "Personal Finance Niche Search",
        flowVolumeDeltaPct: -24.2,
        redistributionShare: 60,
        regimeType: "polarization",
      },
      {
        sourceSurface: "Browse Watch Next",
        targetSurface: "Suggested Evergreen Playlists",
        flowVolumeDeltaPct: 8.5,
        redistributionShare: 40,
        regimeType: "polarization",
      },
    ],
    forensicAutopsy: {
      id: "autopsy-shift-finance-browse-2026",
      shiftId: "shift-finance-browse-2026",
      cohortName: "Finance & Wealth · Macro Band",
      executiveSummary: "Forensic audit confirms a statistically significant (91/100) recommendation redistribution event in Finance & Wealth, concentrated in Browse Home features with a median cohort contraction of -18.7%. Content CTR and viewer retention remain healthy.",
      rootCauseHypothesis: "Algorithmic candidate generation transitioned into an EXPLOITATION_CONSOLIDATION regime, re-allocating cold browse impressions toward high-utility search intent queries and established evergreen playlists.",
      confidenceScore: 91,
      primaryDrivers: [
        {
          driver: "Homepage Browse Candidate Pool Rebalancing",
          impactSharePct: 58,
          evidence: "Median Browse impressions declined by -24.2% across 64% of cohort channels.",
        },
        {
          driver: "Audience Co-Viewing Graph Re-clustering",
          impactSharePct: 27,
          evidence: "Suggested sidebar recommendation links exhibited elevated churn across adjacent tech & crypto niches.",
        },
        {
          driver: "Session Duration Damping",
          impactSharePct: 15,
          evidence: "Average viewer session depth contracted slightly while individual video retention remained flat.",
        },
      ],
      surfaceRedistributionBreakdown: {
        browse: -24.2,
        suggested: 8.5,
        search: 1.2,
        shorts: -0.8,
        notifications: 0.4,
      },
      negativeControlsVerified: [
        {
          metricName: "Search Intent Queries",
          observedVariancePct: 1.2,
          status: "PASS_INVARIANT",
        },
        {
          metricName: "Direct Navigation & Channel Page",
          observedVariancePct: -0.6,
          status: "PASS_INVARIANT",
        },
        {
          metricName: "Subscriber Push Notifications",
          observedVariancePct: 0.4,
          status: "PASS_INVARIANT",
        },
      ],
      durationSensitivity: {
        shortUnder3m: -4.1,
        mid3to10m: -12.3,
        long10to25m: -24.5,
        epic25mPlus: -6.2,
      },
      algorithmicRegime: "EXPLOITATION_CONSOLIDATION",
      tacticalPrescription: [
        "Maintain core publishing schedule; do not unpublish or hastily re-edit existing catalogue assets.",
        "Anchor next 3 titles around high-affinity core search keywords to anchor recommendation seeds.",
        "Increase thumbnail subject contrast and simplify text elements to maximize cold-impression click resilience.",
        "Monitor cohort daily volatility index before implementing major format or duration overhauls.",
      ],
      isAiGenerated: false,
      generatedAt: "2026-08-26T18:00:00Z",
    },
    crossPlatformCorrelations: [
      {
        primaryPlatform: "youtube",
        targetPlatform: "tiktok",
        correlationCoefficient: 0.32,
        isCoVolatile: false,
        sharedMacroDrivers: ["Long-form specific topic saturation"],
      },
      {
        primaryPlatform: "youtube",
        targetPlatform: "instagram",
        correlationCoefficient: 0.28,
        isCoVolatile: false,
        sharedMacroDrivers: ["Market news cycle consolidation"],
      },
    ],
    counterfactualSample: {
      channelId: "demo-ch-finance-1",
      shiftId: "shift-finance-browse-2026",
      startDate: "2026-08-25",
      endDate: "2026-08-31",
      actualViews: 142000,
      counterfactualExpectedViews: 178500,
      lostOrGainedViews: -36500,
      lostOrGainedViewsLowerCI95: -45200,
      lostOrGainedViewsUpperCI95: -27800,
      estimatedRpmImpactUsd: -182.5,
      recoveryVelocityDays: 12,
      dailyTrajectories: [
        { date: "2026-08-25", actual: 24500, expected: 25400, ci95Lower: 23200, ci95Upper: 27600 },
        { date: "2026-08-26", actual: 19800, expected: 25600, ci95Lower: 23100, ci95Upper: 28100 },
        { date: "2026-08-27", actual: 18200, expected: 25500, ci95Lower: 22800, ci95Upper: 28200 },
        { date: "2026-08-28", actual: 19100, expected: 25400, ci95Lower: 22500, ci95Upper: 28300 },
        { date: "2026-08-29", actual: 20400, expected: 25500, ci95Lower: 22400, ci95Upper: 28600 },
        { date: "2026-08-30", actual: 20200, expected: 25600, ci95Lower: 22300, ci95Upper: 28900 },
        { date: "2026-08-31", actual: 19800, expected: 25500, ci95Lower: 22100, ci95Upper: 28900 },
      ],
    },
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
    bayesianEvidence: {
      detected: true,
      posteriorProbability: 0.81,
      changePointIndex: 10,
      changePointDate: "2026-08-22",
      credibleIntervalLower: -18.2,
      credibleIntervalUpper: -6.5,
      bayesFactor: 14.2,
    },
    crossPlatformCorrelations: [
      {
        primaryPlatform: "youtube",
        targetPlatform: "tiktok",
        correlationCoefficient: 0.74,
        isCoVolatile: true,
        sharedMacroDrivers: [
          "Short-form retention window adjustment",
          "Swipe-away velocity penalty threshold shift",
        ],
      },
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
