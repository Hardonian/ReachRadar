import { Platform } from "./channel.js";

export type CohortLevel = "exact" | "niche" | "category" | "format" | "platform";

export interface CohortDefinition {
  id: string;
  name: string;
  slug: string;
  platform: Platform;
  level: CohortLevel;
  niche: string | null;
  contentFormat: string | null;
  sizeBand: string | null;
  geography: string | null;
  language: string | null;
  channelCount: number;
  distinctOwnersCount: number;
  herfindahlIndex: number;
  isPubliclyVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CohortMembership {
  id: string;
  cohortId: string;
  channelId: string;
  joinedAt: string;
}

export interface CohortMetricsDaily {
  id: string;
  cohortId: string;
  metricDate: string; // YYYY-MM-DD
  channelCount: number;
  distinctOwnersCount: number;
  medianViews: number;
  p25Views: number;
  p75Views: number;
  medianViewDuration: number;
  medianCtr: number;
  browseShare: number;
  suggestedShare: number;
  searchShare: number;
  shortsShare: number;
  volatilityScore: number;
  isSuppressed: boolean; // Suppressed if < MIN_PUBLIC_CHANNELS or < MIN_DISTINCT_OWNERS
  createdAt: string;
}
