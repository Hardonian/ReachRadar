# ADR 001: Multi-Tenant Row Level Security (RLS)

## Context
ReachRadar stores proprietary, confidential channel analytics across thousands of creators and agencies. We require guaranteed data isolation where a failure in application logic cannot leak data across tenants.

## Decision
We enforce multi-tenancy at the database kernel level using PostgreSQL Row Level Security (RLS). Every tenant-owned table requires `auth.uid() -> organization_memberships -> organization -> resource` policy enforcement.

## Consequences
- **Positive:** Kernel-level isolation; zero risk of cross-tenant leaks via missing `WHERE` clauses.
- **Trade-off:** Automated RLS tests must run in CI to prevent regression.
