/**
 * Evaluates how many consecutive days an anomaly has survived.
 * Transient 1-day spikes get low persistence; 3+ days sustained shifts receive high confidence.
 */

export interface PersistenceResult {
  consecutiveDays: number;
  persistenceScore: number; // 0 - 100
  isSustained: boolean;
}

export function evaluatePersistence(zScores: number[], threshold = 1.96): PersistenceResult {
  if (!zScores || zScores.length === 0) {
    return { consecutiveDays: 0, persistenceScore: 0, isSustained: false };
  }

  // Count backwards from latest point
  let count = 0;
  for (let i = zScores.length - 1; i >= 0; i--) {
    if (Math.abs(zScores[i]) >= threshold) {
      count++;
    } else {
      break;
    }
  }

  // Mapping:
  // 0 days = 0
  // 1 day = 30 (watch/transient)
  // 2 days = 60 (developing)
  // 3 days = 85 (sustained)
  // 4+ days = 100 (established)
  let score = 0;
  if (count === 1) score = 30;
  else if (count === 2) score = 65;
  else if (count === 3) score = 85;
  else if (count >= 4) score = 100;

  return {
    consecutiveDays: count,
    persistenceScore: score,
    isSustained: count >= 2,
  };
}
