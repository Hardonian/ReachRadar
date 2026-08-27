# ADR 002: Platform Provider Abstraction Layer

## Context
While V1 focuses deeply on YouTube, future product horizons will encompass TikTok, Instagram, Google Discover, Reddit, and Spotify. Domain models must not be polluted with YouTube-specific naming.

## Decision
All external interactions are routed through standard provider interfaces (`CreatorAnalyticsProvider`, `DemandSignalProvider`). Canonical entities use generic naming (`platform`, `distribution_surface`, `creator_account`, `metric`).

## Consequences
- Clean separation of concerns; YouTube API specifics reside entirely within `@reachradar/providers`.
- Zero refactoring of domain or statistical logic when adding future platforms.
