import {
  Organization,
  UserProfile,
  YouTubeChannel,
} from "@reachradar/domain";

export function createMockUserProfile(overrides: Partial<UserProfile> = {}): UserProfile {
  return {
    id: `usr_${Math.random().toString(36).substring(2, 9)}`,
    email: "creator@example.com",
    fullName: "Alex Rivera",
    avatarUrl: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

export function createMockOrganization(overrides: Partial<Organization> = {}): Organization {
  const id = `org_${Math.random().toString(36).substring(2, 9)}`;
  return {
    id,
    name: "Rivera Media",
    slug: "rivera-media",
    planId: "creator",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    ...overrides,
  };
}

export function createMockChannel(overrides: Partial<YouTubeChannel> = {}): YouTubeChannel {
  const id = `ch_${Math.random().toString(36).substring(2, 9)}`;
  return {
    id,
    organizationId: "org-1",
    connectedAccountId: "acc-1",
    platformChannelId: `UC_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    title: "Test Studio Channel",
    customUrl: "@teststudio",
    thumbnailUrl: null,
    publishedAt: "2022-01-01T00:00:00Z",
    country: "US",
    primaryLanguage: "en",
    niche: "finance",
    contentFormat: "long_form",
    sizeBand: "macro",
    subscriberCount: 250000,
    videoCount: 150,
    totalViews: 20000000,
    dataQualityTier: "HIGH",
    baselineStatus: "ready",
    clientGroup: null,
    isDemo: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

export function createMockStripeWebhookEvent(
  type = "customer.subscription.updated",
  subStatus = "active"
) {
  return {
    id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    object: "event",
    type,
    created: Math.floor(Date.now() / 1000),
    data: {
      object: {
        id: `sub_${Math.random().toString(36).substring(2, 10)}`,
        customer: `cus_${Math.random().toString(36).substring(2, 10)}`,
        status: subStatus,
        current_period_start: Math.floor(Date.now() / 1000),
        current_period_end: Math.floor(Date.now() / 1000) + 30 * 86400,
        cancel_at_period_end: false,
        items: {
          data: [
            {
              price: {
                id: "price_pro_monthly",
              },
            },
          ],
        },
      },
    },
  };
}
