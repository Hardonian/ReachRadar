# ReachRadar — Security & Privacy Architecture

## Encryption Standard
- **Cipher:** AES-256-GCM authenticated encryption.
- **Key Derivation:** 32-byte deterministic SHA-256 derivation from `TOKEN_ENCRYPTION_KEY`.
- **Initialization Vector:** 12-byte cryptographically secure random IV generated per encryption.
- **Authentication Tag:** 16-byte GCM authentication tag verifying ciphertext integrity before decryption.
- **Key Rotation:** Keyrings support multi-version key lookup (`keyVersion = "v1"`, `"v2"`).

## Tenant Isolation (PostgreSQL RLS)
1. Every multi-tenant table requires `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`.
2. Access policies evaluate `auth.uid() IN (SELECT user_id FROM organization_memberships WHERE organization_id = target_org)`.
3. Elevation functions use explicit safe search path: `SET search_path = public`.
4. Adversarial tests confirm User A in Org A cannot select, insert, update, or delete Org B data.

## Privacy Invariants
- Private raw analytics never leak into public endpoints.
- Minimum public cohort aggregation thresholds: $\ge 25$ channels and $\ge 10$ distinct owners.
- Complete data deletion lifecycles supported on user request.
