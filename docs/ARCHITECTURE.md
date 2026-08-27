# ReachRadar — Architecture Specification

## Monorepo Layout
```
reachradar/
├── apps/
│   └── web/                   # Next.js 15 App Router application
├── packages/
│   ├── analytics-engine/      # Pure statistical shift & anomaly detection engine
│   ├── config/                # Centralized brand, pricing, thresholds, scoring weights, env
│   ├── database/              # Supabase/Postgres client, repositories, crypto, jobs queue
│   ├── domain/                # Canonical entities, provider interfaces, error taxonomy
│   ├── providers/             # YouTube Analytics/Data API provider & deterministic Demo fixture
│   ├── ui/                    # Design system tokens, terminal/radar theme components, icons
│   └── test-utils/            # Synthetic data fixtures, mock builders, RLS test harnesses
├── supabase/
│   ├── migrations/            # Complete SQL migrations, indexes, RLS policies
│   └── seed.sql               # Seed data
└── docs/                      # Architecture, Methodology, Security, ADRs
```

## Core Abstractions
1. **Provider Abstraction (`CreatorAnalyticsProvider`):** Isolates YouTube OAuth & API calls behind standard contracts, enabling future adapters (TikTok, Instagram, Google Discover) without altering domain logic.
2. **Deterministic Analytics Engine (`@reachradar/analytics-engine`):** Zero-dependency pure mathematical engine computing rolling medians, MAD, robust z-scores, CUSUM step changes, EWMA trends, Herfindahl concentration indices, and composite evidence scores.
3. **Durable Postgres Job Queue (`@reachradar/database`):** PostgreSQL `FOR UPDATE SKIP LOCKED` transactional worker queue with exponential backoff, jitter, and dead-letter queues.
4. **Token Encryption (`TokenEncryptionService`):** Application-side AES-256-GCM encryption with 96-bit IVs, 128-bit auth tags, and versioned keyrings.
5. **Row Level Security (RLS):** Database-kernel enforced tenant isolation where `auth.uid()` resolves permissions strictly through `organization_memberships`.
