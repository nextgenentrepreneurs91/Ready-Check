
### services/trust-engine/src/scoring/deployment-history-weight.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/scoring/deployment-history-weight.ts
 * ============================================================
 */

export interface DeploymentRecord {
  requestId: string;
  completionDate: Date;
  qualityScore: number; // 0-1 (Success rate of the specific mission)
  reliabilityFlag: boolean; // Did they show up on time and follow protocols?
}

/**
 * Calculates a historical reliability weight for the Trust Index.
 * Prioritizes consistency and recency over raw volume to prevent 
 * "Legacy Inflation."
 */
export class DeploymentHistoryWeightEngine {
  /**
   * Returns a historical reliability score (0-100).
   */
  static calculate(history: DeploymentRecord[]): number {
    if (history.length === 0) return 50; // New operators start at mid-trust

    const now = Date.now();
    const SIX_MONTHS_MS = 180 * 24 * 60 * 60 * 1000;

    let aggregateQuality = 0;
    let reliabilityPuntuality = 0;
    let totalWeight = 0;

    history.forEach((record) => {
      const ageMs = now - record.completionDate.getTime();
      
      // 1. Recency Decay: Older missions contribute significantly less.
      const timeWeight = ageMs > (SIX_MONTHS_MS * 2) ? 0.2 : ageMs > SIX_MONTHS_MS ? 0.6 : 1.0;
      
      aggregateQuality += record.qualityScore * timeWeight;
      reliabilityPuntuality += (record.reliabilityFlag ? 1 : 0) * timeWeight;
      totalWeight += timeWeight;
    });

    const averageQuality = (aggregateQuality / totalWeight) * 100;
    const averageReliability = (reliabilityPuntuality / totalWeight) * 100;

    // 2. Volume Log-Scaling: Volume boosts trust but plateaues quickly.
    // Winning 50 missions isn't 10x better than winning 5.
    const volumeBonus = Math.min(Math.log2(history.length + 1) * 5, 20);

    // Final calculation: 40% quality, 40% reliability, 20% volume bonus
    const rawScore = (averageQuality * 0.4) + (averageReliability * 0.4) + volumeBonus;
    
    return Math.round(Math.min(rawScore, 100));
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/trust-engine/src/scoring/deployment-history-weight.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/scoring/deployment-history-weight.ts
 * ============================================================
 */

export interface DeploymentRecord {
  requestId: string;
  completionDate: Date;
  qualityScore: number; // 0-1 (Success rate of the specific mission)
  reliabilityFlag: boolean; // Did they show up on time and follow protocols?
}

/**
 * Calculates a historical reliability weight for the Trust Index.
 * Prioritizes consistency and recency over raw volume to prevent 
 * "Legacy Inflation."
 */
export class DeploymentHistoryWeightEngine {
  /**
   * Returns a historical reliability score (0-100).
   */
  static calculate(history: DeploymentRecord[]): number {
    if (history.length === 0) return 50; // New operators start at mid-trust

    const now = Date.now();
    const SIX_MONTHS_MS = 180 * 24 * 60 * 60 * 1000;

    let aggregateQuality = 0;
    let reliabilityPuntuality = 0;
    let totalWeight = 0;

    history.forEach((record) => {
      const ageMs = now - record.completionDate.getTime();
      
      // 1. Recency Decay: Older missions contribute significantly less.
      const timeWeight = ageMs > (SIX_MONTHS_MS * 2) ? 0.2 : ageMs > SIX_MONTHS_MS ? 0.6 : 1.0;
      
      aggregateQuality += record.qualityScore * timeWeight;
      reliabilityPuntuality += (record.reliabilityFlag ? 1 : 0) * timeWeight;
      totalWeight += timeWeight;
    });

    const averageQuality = (aggregateQuality / totalWeight) * 100;
    const averageReliability = (reliabilityPuntuality / totalWeight) * 100;

    // 2. Volume Log-Scaling: Volume boosts trust but plateaues quickly.
    // Winning 50 missions isn't 10x better than winning 5.
    const volumeBonus = Math.min(Math.log2(history.length + 1) * 5, 20);

    // Final calculation: 40% quality, 40% reliability, 20% volume bonus
    const rawScore = (averageQuality * 0.4) + (averageReliability * 0.4) + volumeBonus;
    
    return Math.round(Math.min(rawScore, 100));
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/trust-engine/src/scoring/deployment-history-weight.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/scoring/deployment-history-weight.ts
 * ============================================================
 */

export interface DeploymentRecord {
  requestId: string;
  completionDate: Date;
  qualityScore: number; // 0-1 (Success rate of the specific mission)
  reliabilityFlag: boolean; // Did they show up on time and follow protocols?
}

/**
 * Calculates a historical reliability weight for the Trust Index.
 * Prioritizes consistency and recency over raw volume to prevent 
 * "Legacy Inflation."
 */
export class DeploymentHistoryWeightEngine {
  /**
   * Returns a historical reliability score (0-100).
   */
  static calculate(history: DeploymentRecord[]): number {
    if (history.length === 0) return 50; // New operators start at mid-trust

    const now = Date.now();
    const SIX_MONTHS_MS = 180 * 24 * 60 * 60 * 1000;

    let aggregateQuality = 0;
    let reliabilityPuntuality = 0;
    let totalWeight = 0;

    history.forEach((record) => {
      const ageMs = now - record.completionDate.getTime();
      
      // 1. Recency Decay: Older missions contribute significantly less.
      const timeWeight = ageMs > (SIX_MONTHS_MS * 2) ? 0.2 : ageMs > SIX_MONTHS_MS ? 0.6 : 1.0;
      
      aggregateQuality += record.qualityScore * timeWeight;
      reliabilityPuntuality += (record.reliabilityFlag ? 1 : 0) * timeWeight;
      totalWeight += timeWeight;
    });

    const averageQuality = (aggregateQuality / totalWeight) * 100;
    const averageReliability = (reliabilityPuntuality / totalWeight) * 100;

    // 2. Volume Log-Scaling: Volume boosts trust but plateaues quickly.
    // Winning 50 missions isn't 10x better than winning 5.
    const volumeBonus = Math.min(Math.log2(history.length + 1) * 5, 20);

    // Final calculation: 40% quality, 40% reliability, 20% volume bonus
    const rawScore = (averageQuality * 0.4) + (averageReliability * 0.4) + volumeBonus;
    
    return Math.round(Math.min(rawScore, 100));
  }
}
```
