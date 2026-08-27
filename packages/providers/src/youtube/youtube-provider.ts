import {
  CreatorAnalyticsProvider,
  DiscoveredChannel,
  FetchMetricsParams,
  RawChannelDailyMetric,
  RawTrafficDailyMetric,
  RawVideoDailyMetric,
  TokenRefreshResult,
  NormalizedDistributionSurface,
  ReachRadarError,
} from "@reachradar/domain";

export const YOUTUBE_SCOPES = [
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/yt-analytics.readonly",
] as const;

export interface YouTubeProviderConfig {
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
}

export class YouTubeProvider implements CreatorAnalyticsProvider {
  public readonly platform = "youtube";
  private clientId?: string;
  private clientSecret?: string;
  private redirectUri?: string;

  constructor(config: YouTubeProviderConfig = {}) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.redirectUri = config.redirectUri;
  }

  isConfigured(): boolean {
    return Boolean(this.clientId && this.clientSecret && this.redirectUri);
  }

  getAuthorizationUrl(state: string): string {
    if (!this.isConfigured()) {
      throw new ReachRadarError({
        code: "PROVIDER_NOT_CONFIGURED",
        message: "Google OAuth credentials (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET) are not configured.",
      });
    }

    const params = new URLSearchParams({
      client_id: this.clientId!,
      redirect_uri: this.redirectUri!,
      response_type: "code",
      scope: YOUTUBE_SCOPES.join(" "),
      access_type: "offline",
      prompt: "consent", // Force consent to guarantee refresh token
      include_granted_scopes: "true",
      state,
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  async exchangeCode(code: string): Promise<{
    accessToken: string;
    refreshToken?: string;
    expiresInSeconds: number;
    grantedScopes: string[];
  }> {
    if (!this.isConfigured()) {
      throw new ReachRadarError({
        code: "PROVIDER_NOT_CONFIGURED",
        message: "Google OAuth credentials are not configured.",
      });
    }

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: this.clientId!,
        client_secret: this.clientSecret!,
        redirect_uri: this.redirectUri!,
        grant_type: "authorization_code",
      }).toString(),
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new ReachRadarError({
        code: "PROVIDER_AUTH_EXPIRED",
        message: `Failed to exchange authorization code with Google: ${response.statusText}`,
        details: { status: response.status, body: errBody },
      });
    }

    const data = (await response.json()) as any;
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresInSeconds: data.expires_in || 3600,
      grantedScopes: (data.scope || "").split(" "),
    };
  }

  async refreshCredentials(refreshToken: string): Promise<TokenRefreshResult> {
    if (!this.isConfigured()) {
      throw new ReachRadarError({
        code: "PROVIDER_NOT_CONFIGURED",
        message: "Google OAuth credentials are not configured.",
      });
    }

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        client_id: this.clientId!,
        client_secret: this.clientSecret!,
        grant_type: "refresh_token",
      }).toString(),
    });

    if (!response.ok) {
      throw new ReachRadarError({
        code: "PROVIDER_AUTH_EXPIRED",
        message: "Failed to refresh Google OAuth token. Refresh token may be revoked.",
      });
    }

    const data = (await response.json()) as any;
    return {
      accessToken: data.access_token,
      expiresInSeconds: data.expires_in || 3600,
      refreshToken: data.refresh_token || refreshToken,
    };
  }

  async revoke(accessToken: string): Promise<void> {
    try {
      await fetch(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
    } catch {
      // Best-effort revocation
    }
  }

  async discoverAccounts(accessToken: string): Promise<DiscoveredChannel[]> {
    const url =
      "https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&mine=true";

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      this.handleApiError(response, "Failed to discover YouTube channels");
    }

    const data = (await response.json()) as any;
    const items = data.items || [];

    return items.map((item: any) => ({
      platformChannelId: item.id,
      title: item.snippet?.title || "Untitled Channel",
      customUrl: item.snippet?.customUrl || null,
      thumbnailUrl: item.snippet?.thumbnails?.default?.url || null,
      publishedAt: item.snippet?.publishedAt || null,
      country: item.snippet?.country || null,
      subscriberCount: parseInt(item.statistics?.subscriberCount || "0", 10),
      videoCount: parseInt(item.statistics?.videoCount || "0", 10),
      totalViews: parseInt(item.statistics?.viewCount || "0", 10),
    }));
  }

  async fetchChannelMetrics(params: FetchMetricsParams): Promise<RawChannelDailyMetric[]> {
    const query = new URLSearchParams({
      ids: "channel==MINE",
      startDate: params.startDate,
      endDate: params.endDate,
      metrics:
        "views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained,subscribersLost,likes,comments,shares",
      dimensions: "day",
      sort: "day",
    });

    const url = `https://youtubeanalytics.googleapis.com/v2/reports?${query.toString()}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${params.accessToken}` },
    });

    if (!response.ok) {
      this.handleApiError(response, "Failed to fetch channel daily metrics");
    }

    const data = (await response.json()) as any;
    const rows = data.rows || [];

    return rows.map((row: any[]) => ({
      metricDate: row[0],
      views: row[1] || 0,
      estimatedMinutesWatched: row[2] || 0,
      averageViewDurationSeconds: row[3] || 0,
      averageViewPercentage: row[4] || 0,
      subscribersGained: row[5] || 0,
      subscribersLost: row[6] || 0,
      likes: row[7] || 0,
      comments: row[8] || 0,
      shares: row[9] || 0,
    }));
  }

  async fetchTrafficMetrics(params: FetchMetricsParams): Promise<RawTrafficDailyMetric[]> {
    const query = new URLSearchParams({
      ids: "channel==MINE",
      startDate: params.startDate,
      endDate: params.endDate,
      metrics: "views,estimatedMinutesWatched",
      dimensions: "day,insightTrafficSourceType",
      sort: "day",
    });

    const url = `https://youtubeanalytics.googleapis.com/v2/reports?${query.toString()}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${params.accessToken}` },
    });

    if (!response.ok) {
      this.handleApiError(response, "Failed to fetch traffic source metrics");
    }

    const data = (await response.json()) as any;
    const rows = data.rows || [];

    return rows.map((row: any[]) => {
      const rawType = row[1] || "UNKNOWN";
      return {
        metricDate: row[0],
        surface: this.normalizeTrafficSource(rawType),
        rawSourceType: rawType,
        views: row[2] || 0,
        estimatedMinutesWatched: row[3] || 0,
      };
    });
  }

  async fetchVideoMetrics(params: FetchMetricsParams): Promise<RawVideoDailyMetric[]> {
    const query = new URLSearchParams({
      ids: "channel==MINE",
      startDate: params.startDate,
      endDate: params.endDate,
      metrics: "views,estimatedMinutesWatched,averageViewDuration,likes,comments,shares",
      dimensions: "video,day",
      maxResults: "50",
      sort: "-views",
    });

    const url = `https://youtubeanalytics.googleapis.com/v2/reports?${query.toString()}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${params.accessToken}` },
    });

    if (!response.ok) {
      this.handleApiError(response, "Failed to fetch video metrics");
    }

    const data = (await response.json()) as any;
    const rows = data.rows || [];

    return rows.map((row: any[]) => ({
      platformVideoId: row[0],
      metricDate: row[1],
      views: row[2] || 0,
      estimatedMinutesWatched: row[3] || 0,
      averageViewDurationSeconds: row[4] || 0,
      likes: row[5] || 0,
      comments: row[6] || 0,
      shares: row[7] || 0,
    }));
  }

  private normalizeTrafficSource(raw: string): NormalizedDistributionSurface {
    const upper = raw.toUpperCase();
    if (upper.includes("BROWSE") || upper === "NO_LINK_EMBEDDED" || upper === "SUBSCRIBER") {
      return "browse";
    }
    if (upper.includes("SUGGESTED") || upper === "RELATED_VIDEO" || upper === "YT_SUGGESTED_PAGES") {
      return "suggested";
    }
    if (upper.includes("SEARCH") || upper === "YT_SEARCH") {
      return "search";
    }
    if (upper.includes("SHORTS") || upper === "SHORTS_SOUND" || upper === "SHORTS_FEED") {
      return "shorts";
    }
    if (upper.includes("NOTIFICATION")) {
      return "notifications";
    }
    if (upper.includes("CHANNEL") || upper === "YT_CHANNEL") {
      return "channel_pages";
    }
    if (upper.includes("PLAYLIST")) {
      return "playlists";
    }
    if (upper.includes("EXT") || upper === "EXT_URL") {
      return "external";
    }
    return "other";
  }

  private handleApiError(response: Response, defaultMessage: string): never {
    if (response.status === 401 || response.status === 403) {
      throw new ReachRadarError({
        code: "PROVIDER_AUTH_EXPIRED",
        message: "Google API authorization expired or access was revoked.",
      });
    }
    if (response.status === 429) {
      throw new ReachRadarError({
        code: "PROVIDER_RATE_LIMITED",
        message: "YouTube API quota or rate limit exceeded.",
      });
    }
    if (response.status >= 500) {
      throw new ReachRadarError({
        code: "PROVIDER_UNAVAILABLE",
        message: "YouTube API service temporarily unavailable.",
      });
    }
    throw new ReachRadarError({
      code: "INTERNAL_ERROR",
      message: `${defaultMessage} (${response.status} ${response.statusText})`,
    });
  }
}
