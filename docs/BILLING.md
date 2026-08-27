# ReachRadar — Billing & Entitlement Architecture

## Principles
1. **Stripe Webhooks are Authoritative:** UI redirects from checkout do not grant paid status; entitlement is modified solely upon valid webhook synchronization (`customer.subscription.updated`).
2. **Idempotent Webhook Processing:** Webhook events are deduplicated by `stripe_event_id` in PostgreSQL before mutations.
3. **Centralized Entitlements:** Plan checks reside in `@reachradar/config` (`canConnectChannels`, `historyDays`, `maxAlerts`, `hasAgencyPortfolioDashboard`).

## Plan Tiers
- **Observer (Free):** Public Weather, 1 channel, 30-day history, 1 alert.
- **Creator ($19/mo):** 1 channel, 365-day history, personal impact analysis, 10 alerts.
- **Pro ($49/mo):** 5 channels, 730-day history, advanced benchmarks, unlimited alerts.
- **Studio ($149/mo):** 25 channels, 10 team seats, client groups, agency portfolio dashboard.
- **Scale ($399/mo):** 100 channels, 50 team seats, REST API access.
- **Enterprise ($999/mo):** 100+ channels, custom retention, SLA, SSO.
