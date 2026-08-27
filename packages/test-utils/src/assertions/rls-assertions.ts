import { expect } from "vitest";
import { InMemoryDatabase } from "@reachradar/database";
import { YouTubeChannel } from "@reachradar/domain";

export interface TenantPair {
  userAId: string;
  orgAId: string;
  userBId: string;
  orgBId: string;
}

/**
 * Executes a comprehensive cross-tenant RLS isolation suite on an in-memory DB or live client.
 * Proves that User A in Org A cannot select, insert, update, or delete Org B data.
 */
export function assertCrossTenantIsolation(db: InMemoryDatabase, pair: TenantPair) {
  // 1. User A cannot select Org B channels
  const userAChannels = db.queryChannelsAsUser(pair.userAId);
  const foundOrgB = userAChannels.some((c) => c.organizationId === pair.orgBId);
  expect(foundOrgB).toBe(false);

  // 2. User A cannot query an Org B channel by specific ID
  const orgBChannel = Array.from(db.channels.values()).find(
    (c) => c.organizationId === pair.orgBId
  );
  if (orgBChannel) {
    const directQuery = db.queryChannelByIdAsUser(pair.userAId, orgBChannel.id);
    expect(directQuery).toBeNull();
  }

  // 3. User A cannot insert into Org B
  const illegalChannel: YouTubeChannel = {
    id: `illegal_ch_${Date.now()}`,
    organizationId: pair.orgBId,
    connectedAccountId: null,
    platformChannelId: "UC_ILLEGAL",
    title: "Illegal Channel Attempt",
    customUrl: null,
    thumbnailUrl: null,
    publishedAt: null,
    country: null,
    primaryLanguage: null,
    niche: "tech",
    contentFormat: "long_form",
    sizeBand: "micro",
    subscriberCount: 100,
    videoCount: 1,
    totalViews: 500,
    dataQualityTier: "LIMITED",
    baselineStatus: "building",
    clientGroup: null,
    isDemo: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const insertSuccess = db.insertChannelAsUser(pair.userAId, illegalChannel);
  expect(insertSuccess).toBe(false);
  expect(db.channels.has(illegalChannel.id)).toBe(false);

  // 4. User A cannot update Org B channel
  if (orgBChannel) {
    const updateSuccess = db.updateChannelAsUser(pair.userAId, orgBChannel.id, {
      title: "Hacked Title",
    });
    expect(updateSuccess).toBe(false);
    expect(db.channels.get(orgBChannel.id)?.title).not.toBe("Hacked Title");
  }

  // 5. User A cannot delete Org B channel
  if (orgBChannel) {
    const deleteSuccess = db.deleteChannelAsUser(pair.userAId, orgBChannel.id);
    expect(deleteSuccess).toBe(false);
    expect(db.channels.has(orgBChannel.id)).toBe(true);
  }
}
