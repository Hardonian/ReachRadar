import { NormalizedDistributionSurface } from "../entities/metrics.js";

export interface DiscoveredChannel {
  platformChannelId: string;
  title: string;
  customUrl: string | null;
  thumbnailUrl: string | null;
  publishedAt: string | null;
  country: string | null;
  subscriberCount: number;
  videoCount: number;
  totalViews: number;
}

export interface RawChannelDailyMetric {
  metricDate: string; // YYYY-MM-DD
  views: number;
  estimatedMinutesWatched: number;
  averageViewDurationSeconds: number;
  averageViewPercentage: number;
  subscribersGained: number;
  subscribersLost: number;
  likes: number;
  comments: number;
  shares: number;
  impressions?: number;
  impressionsCtr?: number;
}

export interface RawTrafficDailyMetric {
  metricDate: string; // YYYY-MM-DD
  surface: NormalizedDistributionSurface;
  rawSourceType: string;
  views: number;
  estimatedMinutesWatched: number;
  impressions?: number;
  impressionsCtr?: number;
}

export interface RawVideoDailyMetric {
  platformVideoId: string;
  metricDate: string;
  views: number;
  estimatedMinutesWatched: number;
  averageViewDurationSeconds: number;
  likes: number;
  comments: number;
  shares: number;
}

export interface TokenRefreshResult {
  accessToken: string;
  expiresInSeconds: number;
  refreshToken?: string;
}

export interface FetchMetricsParams {
  accessToken: string;
  platformChannelId: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}

export interface CreatorAnalyticsProvider {
  readonly platform: string;
  discoverAccounts(accessToken: string): Promise<DiscoveredChannel[]>;
  fetchChannelMetrics(params: FetchMetricsParams): Promise<RawChannelDailyMetric[]>;
  fetchTrafficMetrics(params: FetchMetricsParams): Promise<RawTrafficDailyMetric[]>;
  fetchVideoMetrics(params: FetchMetricsParams): Promise<RawVideoDailyMetric[]>;
  refreshCredentials(refreshToken: string): Promise<TokenRefreshResult>;
  revoke(accessToken: string): Promise<void>;
}

export interface DemandQuery {
  niche: string;
  geography?: string;
  startDate: string;
  endDate: string;
}

export interface DemandPoint {
  date: string;
  indexValue: number; // 0 - 100
}

export interface DemandSeries {
  query: DemandQuery;
  points: DemandPoint[];
  correlationWithCohort?: number;
}

export interface DemandSignalProvider {
  getDemandSeries(query: DemandQuery): Promise<DemandSeries | null>;
}

export interface StructuredEvidence {
  shiftTitle: string;
  cohortName: string;
  surface: string;
  evidenceScore: number;
  confidenceLabel: string;
  medianDeltaPct: number;
  affectedChannelsPct: number;
  channelsAnalyzed: number;
  distinctOwners: number;
  whatChanged: string;
  metricsThatDidNotChange: string[];
  alternativeExplanations: string[];
  recommendationAction: string;
  recommendationRationale: string;
}

export interface NarrativeSummary {
  headline: string;
  executiveSummary: string;
  tacticalAdvice: string;
  isAiGenerated: boolean;
}

export interface InsightNarrator {
  summarize(evidence: StructuredEvidence): Promise<NarrativeSummary>;
}
