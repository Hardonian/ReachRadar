export type OrgRole = "owner" | "admin" | "analyst" | "viewer";

export interface UserProfile {
  id: string; // auth.users uuid
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  planId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface OrganizationMembership {
  id: string;
  organizationId: string;
  userId: string;
  role: OrgRole;
  createdAt: string;
  updatedAt: string;
}

export interface ApiKey {
  id: string;
  organizationId: string;
  name: string;
  keyPrefix: string; // e.g. rr_live_ or rr_test_
  keyHash: string;
  lastUsedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
  revokedAt: string | null;
}

export interface AuditLogEvent {
  id: string;
  organizationId: string;
  actorUserId: string | null;
  action: string;
  targetType: string;
  targetId: string | null;
  requestId: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}
