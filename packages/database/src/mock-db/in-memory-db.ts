import {
  Organization,
  OrganizationMembership,
  UserProfile,
  YouTubeChannel,
  ChannelDailyMetric,
  TrafficSourceDailyMetric,
  ShiftEvent,
  ChannelShiftImpact,
  Recommendation,
  AlertRule,
  Subscription,
  AuditLogEvent,
  ApiKey,
} from "@reachradar/domain";

export class InMemoryDatabase {
  public profiles = new Map<string, UserProfile>();
  public organizations = new Map<string, Organization>();
  public memberships = new Map<string, OrganizationMembership>();
  public channels = new Map<string, YouTubeChannel>();
  public channelMetrics = new Map<string, ChannelDailyMetric>();
  public trafficMetrics = new Map<string, TrafficSourceDailyMetric>();
  public shifts = new Map<string, ShiftEvent>();
  public impacts = new Map<string, ChannelShiftImpact>();
  public recommendations = new Map<string, Recommendation>();
  public alertRules = new Map<string, AlertRule>();
  public subscriptions = new Map<string, Subscription>();
  public auditLogs = new Map<string, AuditLogEvent>();
  public apiKeys = new Map<string, ApiKey>();

  // RLS Helper: Get organizations user belongs to
  getUserOrgIds(userId: string): string[] {
    const orgIds: string[] = [];
    for (const m of this.memberships.values()) {
      if (m.userId === userId) {
        orgIds.push(m.organizationId);
      }
    }
    return orgIds;
  }

  // RLS Helper: Check if user has role in org
  hasOrgRole(userId: string, orgId: string, allowedRoles: string[]): boolean {
    for (const m of this.memberships.values()) {
      if (m.userId === userId && m.organizationId === orgId && allowedRoles.includes(m.role)) {
        return true;
      }
    }
    return false;
  }

  // RLS-guarded Channel Queries
  queryChannelsAsUser(userId: string, orgId?: string): YouTubeChannel[] {
    const allowedOrgs = this.getUserOrgIds(userId);
    const results: YouTubeChannel[] = [];
    for (const ch of this.channels.values()) {
      if (allowedOrgs.includes(ch.organizationId)) {
        if (!orgId || ch.organizationId === orgId) {
          results.push(ch);
        }
      }
    }
    return results;
  }

  queryChannelByIdAsUser(userId: string, channelId: string): YouTubeChannel | null {
    const ch = this.channels.get(channelId);
    if (!ch) return null;
    const allowedOrgs = this.getUserOrgIds(userId);
    if (!allowedOrgs.includes(ch.organizationId)) {
      return null; // RLS denies access
    }
    return ch;
  }

  insertChannelAsUser(userId: string, channel: YouTubeChannel): boolean {
    const allowedOrgs = this.getUserOrgIds(userId);
    if (!allowedOrgs.includes(channel.organizationId)) {
      return false; // Forbidden by RLS
    }
    this.channels.set(channel.id, channel);
    return true;
  }

  updateChannelAsUser(userId: string, channelId: string, updates: Partial<YouTubeChannel>): boolean {
    const ch = this.channels.get(channelId);
    if (!ch) return false;
    const isAllowed = this.hasOrgRole(userId, ch.organizationId, ["owner", "admin", "analyst"]);
    if (!isAllowed) return false;

    this.channels.set(channelId, { ...ch, ...updates, updatedAt: new Date().toISOString() });
    return true;
  }

  deleteChannelAsUser(userId: string, channelId: string): boolean {
    const ch = this.channels.get(channelId);
    if (!ch) return false;
    const isOwnerOrAdmin = this.hasOrgRole(userId, ch.organizationId, ["owner", "admin"]);
    if (!isOwnerOrAdmin) return false;

    this.channels.delete(channelId);
    return true;
  }

  // RLS-guarded Metrics Queries
  queryMetricsAsUser(userId: string, channelId: string): ChannelDailyMetric[] {
    const ch = this.queryChannelByIdAsUser(userId, channelId);
    if (!ch) return []; // RLS denies access

    const metrics: ChannelDailyMetric[] = [];
    for (const m of this.channelMetrics.values()) {
      if (m.channelId === channelId) {
        metrics.push(m);
      }
    }
    return metrics;
  }

  // Public Shift queries (pre-aggregated, no private channel details)
  queryPublicShifts(): ShiftEvent[] {
    const results: ShiftEvent[] = [];
    for (const s of this.shifts.values()) {
      if (s.isPubliclyVisible) {
        results.push(s);
      }
    }
    return results;
  }
}
