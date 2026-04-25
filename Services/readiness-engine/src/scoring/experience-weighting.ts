### services/readiness-engine/src/scoring/experience-weighting.ts
```typescript
/**
 * ============================================================
 * FILE: services/readiness-engine/src/scoring/experience-weighting.ts
 * ============================================================
 */

export interface MissionEvent {
  id: string;
  completionDate: Date;
  roleMatch: boolean; // Was the mission in the same role as current?
  difficulty: 1 | 2 | 3; // Tactical complexity
}

/**
 * Calculates a "Confidence Multiplier" based on operational history.
 * Newer, successful missions provide the strongest boost.
 */
export class ExperienceWeightingEngine {
  /**
   * Returns a multiplier between 1.0 and 1.5.
   */
  static calculateMultiplier(history: MissionEvent[]): number {
    if (history.length === 0) return 1.0;

    const SIX_MONTHS_MS = 180 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    let totalExperienceUnits = 0;

    history.forEach((mission) => {
      const ageMs = now - mission.completionDate.getTime();
      
      // Time Decay: Missions older than 6 months lose 50% value.
      // Older than 1 year lose 90% value.
      const decayFactor = ageMs > (SIX_MONTHS_MS * 2) ? 0.1 : ageMs > SIX_MONTHS_MS ? 0.5 : 1.0;
      
      // Role Relevance: Direct matches provide more weight
      const relevanceFactor = mission.roleMatch ? 1.2 : 0.8;

      totalExperienceUnits += mission.difficulty * decayFactor * relevanceFactor;
    });

    // Diminishing Returns: Experience boost curves off as units increase.
    // 0 units = 1.0
    // 5 units = ~1.15
    // 20+ units = caps near 1.5
    const boost = Math.log10(totalExperienceUnits + 1) * 0.4;
    
    return Math.min(1.0 + boost, 1.5);
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/readiness-engine/src/scoring/experience-weighting.ts
```typescript
/**
 * ============================================================
 * FILE: services/readiness-engine/src/scoring/experience-weighting.ts
 * ============================================================
 */

export interface MissionEvent {
  id: string;
  completionDate: Date;
  roleMatch: boolean; // Was the mission in the same role as current?
  difficulty: 1 | 2 | 3; // Tactical complexity
}

/**
 * Calculates a "Confidence Multiplier" based on operational history.
 * Newer, successful missions provide the strongest boost.
 */
export class ExperienceWeightingEngine {
  /**
   * Returns a multiplier between 1.0 and 1.5.
   */
  static calculateMultiplier(history: MissionEvent[]): number {
    if (history.length === 0) return 1.0;

    const SIX_MONTHS_MS = 180 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    let totalExperienceUnits = 0;

    history.forEach((mission) => {
      const ageMs = now - mission.completionDate.getTime();
      
      // Time Decay: Missions older than 6 months lose 50% value.
      // Older than 1 year lose 90% value.
      const decayFactor = ageMs > (SIX_MONTHS_MS * 2) ? 0.1 : ageMs > SIX_MONTHS_MS ? 0.5 : 1.0;
      
      // Role Relevance: Direct matches provide more weight
      const relevanceFactor = mission.roleMatch ? 1.2 : 0.8;

      totalExperienceUnits += mission.difficulty * decayFactor * relevanceFactor;
    });

    // Diminishing Returns: Experience boost curves off as units increase.
    // 0 units = 1.0
    // 5 units = ~1.15
    // 20+ units = caps near 1.5
    const boost = Math.log10(totalExperienceUnits + 1) * 0.4;
    
    return Math.min(1.0 + boost, 1.5);
  }
}
```
