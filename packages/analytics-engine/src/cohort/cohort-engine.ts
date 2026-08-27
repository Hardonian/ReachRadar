import {
  MIN_PUBLIC_CHANNELS,
  MIN_DISTINCT_OWNERS,
  MAX_HERFINDAHL_OWNER_INDEX,
} from "@reachradar/config";
import { CohortDefinition, CohortLevel, CohortMetricsDaily } from "@reachradar/domain";
import {
  median,
  percentile,
  calculateHerfindahlIndex,
  calculateVolatility,
} from "../stats/robust-stats.js";

export interface ChannelCohortAssignment {
  channelId: string;
  ownerId: string;
  niche: string;
  contentFormat: string;
  sizeBand: string;
  geography?: string;
  language?: string;
}

export interface MatchedCohortResult {
  cohortId: string;
  cohortName: string;
  level: CohortLevel;
  channelCount: number;
  distinctOwners: number;
  isPubliclyVisible: boolean;
  suppressionReason: string | null;
}

/**
 * Hierarchical Cohort Fallback:
 * 1. Exact: niche + sizeBand + contentFormat
 * 2. Niche: niche + contentFormat
 * 3. Category: niche
 * 4. Format: contentFormat
 * 5. Platform: global YouTube baseline
 */
export function resolveCohortHierarchy(
  channel: ChannelCohortAssignment,
  existingCohorts: CohortDefinition[]
): MatchedCohortResult {
  // 1. Try Exact match
  const exact = existingCohorts.find(
    (c) =>
      c.level === "exact" &&
      c.niche === channel.niche &&
      c.sizeBand === channel.sizeBand &&
      c.contentFormat === channel.contentFormat
  );
  if (exact && exact.channelCount >= 10) {
    return formatCohortMatch(exact);
  }

  // 2. Try Niche match
  const niche = existingCohorts.find(
    (c) =>
      c.level === "niche" &&
      c.niche === channel.niche &&
      c.contentFormat === channel.contentFormat
  );
  if (niche && niche.channelCount >= 15) {
    return formatCohortMatch(niche);
  }

  // 3. Try Category match
  const category = existingCohorts.find(
    (c) => c.level === "category" && c.niche === channel.niche
  );
  if (category && category.channelCount >= MIN_PUBLIC_CHANNELS) {
    return formatCohortMatch(category);
  }

  // 4. Try Format match
  const format = existingCohorts.find(
    (c) => c.level === "format" && c.contentFormat === channel.contentFormat
  );
  if (format && format.channelCount >= MIN_PUBLIC_CHANNELS) {
    return formatCohortMatch(format);
  }

  // 5. Fallback to Platform Global
  const platform = existingCohorts.find((c) => c.level === "platform") || {
    id: "cohort-yt-global",
    name: "YouTube Global Baseline",
    slug: "youtube-global",
    platform: "youtube" as const,
    level: "platform" as const,
    niche: null,
    contentFormat: null,
    sizeBand: null,
    geography: null,
    language: null,
    channelCount: 150,
    distinctOwnersCount: 85,
    herfindahlIndex: 0.04,
    isPubliclyVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return formatCohortMatch(platform);
}

function formatCohortMatch(cohort: CohortDefinition): MatchedCohortResult {
  let suppressionReason: string | null = null;
  let isPublic = cohort.isPubliclyVisible;

  if (cohort.channelCount < MIN_PUBLIC_CHANNELS) {
    isPublic = false;
    suppressionReason = `Channel sample size (${cohort.channelCount}) is below privacy requirement (${MIN_PUBLIC_CHANNELS})`;
  } else if (cohort.distinctOwnersCount < MIN_DISTINCT_OWNERS) {
    isPublic = false;
    suppressionReason = `Distinct owners (${cohort.distinctOwnersCount}) is below requirement (${MIN_DISTINCT_OWNERS})`;
  } else if (cohort.herfindahlIndex > MAX_HERFINDAHL_OWNER_INDEX) {
    isPublic = false;
    suppressionReason = `High owner concentration (HHI ${cohort.herfindahlIndex.toFixed(2)})`;
  }

  return {
    cohortId: cohort.id,
    cohortName: cohort.name,
    level: cohort.level,
    channelCount: cohort.channelCount,
    distinctOwners: cohort.distinctOwnersCount,
    isPubliclyVisible: isPublic,
    suppressionReason,
  };
}

export interface RawChannelDailyStats {
  channelId: string;
  ownerId: string;
  views: number;
  averageViewDuration: number;
  ctr: number;
  browseViews: number;
  suggestedViews: number;
  searchViews: number;
  shortsViews: number;
}

/**
 * Aggregates daily metrics from member channels into a cohort daily summary record.
 */
export function aggregateCohortDailyMetrics(
  cohortId: string,
  metricDate: string,
  channelStats: RawChannelDailyStats[]
): CohortMetricsDaily {
  const channelCount = channelStats.length;
  const ownerCounts: Record<string, number> = {};
  for (const s of channelStats) {
    ownerCounts[s.ownerId] = (ownerCounts[s.ownerId] || 0) + 1;
  }
  const distinctOwners = Object.keys(ownerCounts).length;
  const hhi = calculateHerfindahlIndex(Object.values(ownerCounts));

  const isSuppressed =
    channelCount < MIN_PUBLIC_CHANNELS ||
    distinctOwners < MIN_DISTINCT_OWNERS ||
    hhi > MAX_HERFINDAHL_OWNER_INDEX;

  const viewsList = channelStats.map((s) => s.views);
  const medViews = median(viewsList);
  const p25 = percentile(viewsList, 25);
  const p75 = percentile(viewsList, 75);
  const medAvd = median(channelStats.map((s) => s.averageViewDuration));
  const medCtr = median(channelStats.map((s) => s.ctr));

  const totalViews = viewsList.reduce((a, b) => a + b, 0);
  const totalBrowse = channelStats.reduce((a, b) => a + b.browseViews, 0);
  const totalSuggested = channelStats.reduce((a, b) => a + b.suggestedViews, 0);
  const totalSearch = channelStats.reduce((a, b) => a + b.searchViews, 0);
  const totalShorts = channelStats.reduce((a, b) => a + b.shortsViews, 0);

  const browseShare = totalViews > 0 ? totalBrowse / totalViews : 0;
  const suggestedShare = totalViews > 0 ? totalSuggested / totalViews : 0;
  const searchShare = totalViews > 0 ? totalSearch / totalViews : 0;
  const shortsShare = totalViews > 0 ? totalShorts / totalViews : 0;

  const volatility = calculateVolatility(viewsList);

  return {
    id: `cohort-metric-${cohortId}-${metricDate}`,
    cohortId,
    metricDate,
    channelCount,
    distinctOwnersCount: distinctOwners,
    medianViews: Math.round(medViews),
    p25Views: Math.round(p25),
    p75Views: Math.round(p75),
    medianViewDuration: Math.round(medAvd * 10) / 10,
    medianCtr: Math.round(medCtr * 100) / 100,
    browseShare: Math.round(browseShare * 1000) / 1000,
    suggestedShare: Math.round(suggestedShare * 1000) / 1000,
    searchShare: Math.round(searchShare * 1000) / 1000,
    shortsShare: Math.round(shortsShare * 1000) / 1000,
    volatilityScore: Math.round(volatility),
    isSuppressed,
    createdAt: new Date().toISOString(),
  };
}
