import { DataQualityTier } from "@reachradar/config";

export type Platform =
  | "youtube"
  | "tiktok"
  | "instagram"
  | "google_search"
  | "google_discover"
  | "reddit"
  | "linkedin"
  | "spotify";

export type ConnectionStatus =
  | "connected"
  | "disconnected"
  | "expired"
  | "revoked"
  | "rate_limited"
  | "error";

export interface ConnectedAccount {
  id: string;
  organizationId: string;
  platform: Platform;
  providerAccountId: string;
  grantedScopes: string[];
  accessTokenExpiry: string | null;
  encryptedRefreshToken: string | null;
  tokenKeyVersion: string;
  connectionStatus: ConnectionStatus;
  lastSuccessfulSyncAt: string | null;
  lastErrorCode: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface YouTubeChannel {
  id: string;
  organizationId: string;
  connectedAccountId: string | null;
  platformChannelId: string; // YouTube Channel ID (e.g. UC...)
  title: string;
  customUrl: string | null;
  thumbnailUrl: string | null;
  publishedAt: string | null;
  country: string | null;
  primaryLanguage: string | null;
  niche: string; // e.g. "finance", "tech", "gaming", "education", "beauty", "fitness"
  contentFormat: "long_form" | "shorts" | "mixed" | "live";
  sizeBand: "nano" | "micro" | "mid" | "macro" | "mega";
  subscriberCount: number;
  videoCount: number;
  totalViews: number;
  dataQualityTier: DataQualityTier;
  baselineStatus: "building" | "ready" | "stale" | "insufficient";
  clientGroup: string | null;
  isDemo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface YouTubeVideo {
  id: string;
  channelId: string;
  platformVideoId: string;
  title: string;
  publishedAt: string;
  durationSeconds: number;
  isShort: boolean;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}
