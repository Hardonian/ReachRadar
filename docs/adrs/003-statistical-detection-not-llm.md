# ADR 003: Statistical Anomaly Ensemble Instead of LLMs

## Context
LLMs are non-deterministic, hallucination-prone, and mathematically uncalibrated for numerical time-series change detection.

## Decision
All shift detection, volatility scoring, consensus measurement, and recommendations are computed via deterministic statistical algorithms (Robust Z-score with MAD, CUSUM, EWMA, HHI). LLMs (via Gemini) are optionally utilized exclusively as narrative formatters of structured mathematical facts.

## Consequences
- 100% reproducible, explainable, and verifiable shift detection.
- Zero risk of hallucinatory platform change claims.
