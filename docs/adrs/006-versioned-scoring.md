# ADR 006: Versioned Scoring Matrices and Lineage

## Context
As statistical algorithms evolve, scoring weights and threshold formulas may be refined. Historical shift events must remain reproducible and immutable.

## Decision
All shift events, anomaly records, and recommendations store their calculation version (`scoring_version = "1.0.0"`). Historical evidence scores are never retroactively recalculated when scoring formulas update.

## Consequences
- Full data provenance and historical reproducibility.
- Backtesting frameworks can compare precision/recall across scoring versions.
