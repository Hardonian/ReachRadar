import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryDatabase } from "../src/mock-db/in-memory-db.js";

describe("Row Level Security (RLS) Tenant Isolation", () => {
  let db: InMemoryDatabase;

  beforeEach(() => {
    db = new InMemoryDatabase();

    // User A in Org A
    db.profiles.set("user_a", {
      id: "user_a",
      email: "alex@orgA.com",
      fullName: "Alex Rivera",
      avatarUrl: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    db.organizations.set("org_a", {
      id: "org_a",
      name: "Organization A",
      slug: "org-a",
      planId: "creator",
      deletedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    db.memberships.set("m_a", {
      id: "m_a",
      organizationId: "org_a",
      userId: "user_a",
      role: "owner",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    db.channels.set("ch_a", {
      id: "ch_a",
      organizationId: "org_a",
      connectedAccountId: "conn_a",
      youtubeChannelId: "UC_a",
      title: "Channel A (Finance)",
      customUrl: "@channela",
      subscriberCount: 500000,
      videoCount: 120,
      viewCount: 15000000,
      niche: "finance",
      sizeBand: "macro",
      contentFormat: "long_form",
      dataQualityTier: "HIGH",
      baselineStatus: "ready",
      isActive: true,
      lastSynchronizedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // User B in Org B
    db.profiles.set("user_b", {
      id: "user_b",
      email: "bob@orgB.com",
      fullName: "Bob Smith",
      avatarUrl: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    db.organizations.set("org_b", {
      id: "org_b",
      name: "Organization B",
      slug: "org-b",
      planId: "creator",
      deletedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    db.memberships.set("m_b", {
      id: "m_b",
      organizationId: "org_b",
      userId: "user_b",
      role: "owner",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    db.channels.set("ch_b", {
      id: "ch_b",
      organizationId: "org_b",
      connectedAccountId: "conn_b",
      youtubeChannelId: "UC_b",
      title: "Channel B (Tech)",
      customUrl: "@channelb",
      subscriberCount: 250000,
      videoCount: 90,
      viewCount: 8000000,
      niche: "technology",
      sizeBand: "mid",
      contentFormat: "long_form",
      dataQualityTier: "HIGH",
      baselineStatus: "ready",
      isActive: true,
      lastSynchronizedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  });

  it("prevents User A from reading Org B channels and metrics", () => {
    // User A query
    const visibleChannels = db.queryChannelsAsUser("user_a");
    expect(visibleChannels.length).toBe(1);
    expect(visibleChannels[0].id).toBe("ch_a");
    expect(visibleChannels.find((c) => c.id === "ch_b")).toBeUndefined();

    // Query Channel B specifically as User A returns null (RLS filtered)
    const channelB = db.queryChannelByIdAsUser("user_a", "ch_b");
    expect(channelB).toBeNull();
  });

  it("prevents User A from mutating or deleting Org B resources", () => {
    // User A attempts to update Channel B in Org B
    const updateSuccess = db.updateChannelAsUser("user_a", "ch_b", {
      title: "Malicious Tamper",
    });
    expect(updateSuccess).toBe(false);
    expect(db.channels.get("ch_b")?.title).toBe("Channel B (Tech)");

    // User A attempts to delete Channel B in Org B
    const deleteSuccess = db.deleteChannelAsUser("user_a", "ch_b");
    expect(deleteSuccess).toBe(false);
    expect(db.channels.get("ch_b")).toBeDefined();
  });
});
