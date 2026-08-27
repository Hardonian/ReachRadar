export type NormalizedDistributionSurface =
  | "browse"
  | "suggested"
  | "search"
  | "shorts"
  | "notifications"
  | "channel_pages"
  | "playlists"
  | "external"
  | "other";

export interface ChannelDailyMetric {
  id: string;
  channelId: string;
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
  impressions: number | null;
  impressionsCtr: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface TrafficSourceDailyMetric {
  id: string;
  channelId: string;
  metricDate: string; // YYYY-MM-DD
  surface: NormalizedDistributionSurface;
  rawSourceType: string;
  views: number;
  estimatedMinutesWatched: number;
  impressions: number | null;
  impressionsCtr: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface VideoDailyMetric {
  id: string;
  videoId: string;
  channelId: string;
  metricDate: string; // YYYY-MM-DD
  views: number;
  estimatedMinutesWatched: number;
  averageViewDurationSeconds: number;
  likes: number;
  comments: number;
  shares: number;
  impressions: number | null;
  impressionsCtr: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface MetricTimeSeriesPoint {
  date: string;
  value: number;
  baseline?: number;
  lowerBound?: number;
  upperBound?: number;
  cohortMedian?: number;
}
