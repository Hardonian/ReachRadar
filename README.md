# ReachRadar

> **Independent Observability for Recommendation Algorithms**  
> *Know when distribution shifts — before your strategy does.*

ReachRadar is a commercial-grade, multi-tenant SaaS that ingests real-time creator analytics and external signals to identify, measure, validate, and explain algorithmic recommendation shifts with statistical rigor.

---

## ⚡ Key Features

- **Platform Weather Station:** Real-time cross-cohort volatility indices for YouTube Browse, Suggested, Search, and Shorts.
- **Hierarchical Matched Cohorts:** Automatically falls back from granular niche $\to$ broad vertical $\to$ size band $\to$ format $\to$ global baseline.
- **Statistical Ensemble Engine:** Pure deterministic anomaly detection combining Robust Z-scores (MAD), CUSUM step detection, EWMA momentum, HHI owner concentration, and cross-metric negative controls.
- **Strict Privacy Invariants:** Hard thresholds ($\ge 25$ public channels and $\ge 10$ distinct owners) ensure raw private creator data never becomes public data.
- **Enterprise Multi-Tenancy:** PostgreSQL kernel-enforced Row-Level Security (RLS) and AES-256-GCM token encryption.
- **Actionable Recommendations:** Deterministic, non-hallucinatory creator advice (*HOLD STRATEGY*, *REVIEW PACKAGING*, *REVIEW TOPIC MIX*, *DOUBLE DOWN*).
- **Agency Portfolio Radar:** Centralized multi-channel roster management, volatility tracking, and CSV/print reporting.

---

## 🏗️ Architecture & Monorepo

```
reachradar/
├── apps/
│   └── web/                   # Next.js 15 App Router application (Tailwind CSS, Lucide, Recharts)
├── packages/
│   ├── analytics-engine/      # Pure mathematical detection engine & backtest harness
│   ├── config/                # Centralized brand, pricing, thresholds, scoring weights, env schemas
│   ├── database/              # Supabase/PostgreSQL client, AES-256-GCM crypto, SKIP LOCKED queue
│   ├── domain/                # Canonical entities, error taxonomy, provider contracts
│   ├── providers/             # YouTube Analytics/Data API adapter, deterministic demo fixture
│   ├── ui/                    # Design system tokens, radar gauges, stat cards, brand SVG assets
│   └── test-utils/            # Test builders, fixtures, adversarial RLS assertions
├── supabase/
│   ├── migrations/            # Complete SQL migrations, indexes, RLS policies
│   └── seed.sql               # Seed data for cohorts and demo shifts
└── docs/                      # Architecture, Methodology, Security, Runbooks, ADRs 001–006
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js `22.x`
- `pnpm` `11.8.0` (Corepack will select the pinned version)
- Optional: Supabase CLI / PostgreSQL 15+ for local database

### 1. Installation
```bash
pnpm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Vercel

Import the repository at its root. The checked-in `vercel.json` installs the full
pnpm workspace, builds only the web app and its internal dependencies, publishes
`apps/web/.next`, and invokes the authenticated job worker every 15 minutes. Add
the production variables listed in [the deployment guide](docs/DEPLOYMENT.md)
before promoting the deployment.

---

## 🧪 Testing & Verification Suite

```bash
# Run unit & statistical backtest tests
pnpm test

# Run type checks across all packages
pnpm typecheck

# Run production build
pnpm build
```

---

## 🛡️ Security & Privacy Invariants

- **Row Level Security (RLS):** Enabled on all tables. All tenant queries verify `auth.uid() -> organization_memberships`.
- **Token Encryption:** OAuth refresh tokens are encrypted at the application boundary using AES-256-GCM with versioned keyrings.
- **Privacy Thresholds:** Any public cohort aggregation with $< 25$ channels or $< 10$ distinct owners is automatically **SUPPRESSED**.
- **No Scraping:** ReachRadar relies strictly on authorized, official APIs.

---

## 📜 License
Proprietary Commercial SaaS. All rights reserved.
