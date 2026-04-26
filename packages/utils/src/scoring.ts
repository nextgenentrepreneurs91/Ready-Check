### packages/utils/src/scoring.ts
```typescript
/**
 * ============================================================
 * FILE: packages/utils/src/scoring.ts
 * ============================================================
 */

/**
 * Ensures a score stays within the 0-100 operational bounds.
 */
export function clampScore(value: number): number {
  return Math.min(Math.max(Math.round(value), 0), 100);
}

/**
 * Calculates a weighted average from a set of scores and weights.
 */
export function calculateWeightedAverage(
  factors: { score: number; weight: number }[]
): number {
  const totalWeight = factors.reduce((acc, f) => acc + f.weight, 0);
  if (totalWeight === 0) return 0;

  const weightedSum = factors.reduce((acc, f) => acc + f.score * f.weight, 0);
  return clampScore(weightedSum / totalWeight);
}

/**
 * Maps a numerical trust index to a semantic operational bracket.
 */
export function getTrustLabel(score: number): 'ELITE' | 'RELIABLE' | 'PROVISIONAL' | 'RESTRICTED' {
  if (score >= 90) return 'ELITE';
  if (score >= 75) return 'RELIABLE';
  if (score >= 50) return 'PROVISIONAL';
  return 'RESTRICTED';
}

/**
 * Translates a numeric readiness rate into a semantic state for UI banners.
 */
export function mapReadinessToState(rate: number): 'verified' | 'attention' | 'blocked' | 'pending' {
  if (rate >= 0.9) return 'verified';     // 90%+
  if (rate >= 0.7) return 'attention';    // 70-89%
  if (rate > 0) return 'pending';         // Some progress
  return 'blocked';                       // 0% or failing
}
```
