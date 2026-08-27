# ADR 004: Postgres-Backed Job Queue with SKIP LOCKED

## Context
Background ingestion and analysis jobs require reliable durability, retries, and locking without introducing complex auxiliary infrastructure like Redis/RabbitMQ.

## Decision
We implement a transactional PostgreSQL job queue using `SELECT ... FOR UPDATE SKIP LOCKED`, exponential backoff with jitter, and dead-letter queues.

## Consequences
- Single stateful datastore (PostgreSQL); simplified local development and production operations.
- Strong transactional integrity across database mutations and job claims.
