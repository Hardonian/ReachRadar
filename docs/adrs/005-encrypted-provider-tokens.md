# ADR 005: Application-Level Authenticated Encryption for Provider Credentials

## Context
OAuth refresh tokens grant continuous access to creator YouTube Analytics. Storing credentials in plaintext is unacceptable.

## Decision
We encrypt tokens at the application boundary prior to database persistence using AES-256-GCM authenticated encryption with 96-bit random IVs and 128-bit authentication tags.

## Consequences
- Compromise of database read access does not leak usable OAuth credentials.
- Key rotation is supported through versioned keyrings.
