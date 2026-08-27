import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryDatabase } from "../src/mock-db/in-memory-db";

describe("Row Level Security (RLS) Tenant Isolation", () => {
  let db: InMemoryDatabase;

  beforeEach(() => {
    db = new InMemoryDatabase();
  });

  it("prevents User A from reading Org B channels and metrics", async () => {
    // Org A setup
    db.seedUser("user_a", "alex@orgA.com");
    db.seedOrg("org_a", "Organization A");
    db.seedMembership("user_a", "org_a", "owner");
    db.seedChannel("ch_a", "org_a", "Channel A (Finance)");

    // Org B setup
    db.seedUser("user_b", "bob@orgB.com");
    db.seedOrg("org_b", "Organization B");
    db.seedMembership("user_b", "org_b", "owner");
    db.seedChannel("ch_b", "org_b", "Channel B (Tech)");

    // Authenticate as User A
    db.setAuthUser("user_a");

    // Query channels
    const visibleChannels = await db.queryChannels();
    expect(visibleChannels.length).toBe(1);
    expect(visibleChannels[0].id).toBe("ch_a");
    expect(visibleChannels.find((c) => c.id === "ch_b")).toBeUndefined();
  });

  it("prevents User A from mutating or deleting Org B resources", async () => {
    db.seedUser("user_a", "alex@orgA.com");
    db.seedOrg("org_a", "Organization A");
    db.seedMembership("user_a", "org_a", "owner");

    db.seedUser("user_b", "bob@orgB.com");
    db.seedOrg("org_b", "Organization B");
    db.seedMembership("user_b", "org_b", "owner");
    db.seedChannel("ch_b", "org_b", "Channel B");

    // Authenticate as User A and attempt to update Channel B in Org B
    db.setAuthUser("user_a");

    await expect(
      db.updateChannel("ch_b", { title: "Malicious Tamper" })
    ).rejects.toThrow(/PERMISSION_DENIED|RLS_VIOLATION/);

    await expect(db.deleteChannel("ch_b")).rejects.toThrow(
      /PERMISSION_DENIED|RLS_VIOLATION/
    );
  });
});
