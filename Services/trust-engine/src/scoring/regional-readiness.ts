### services/trust-engine/src/scoring/regional-readiness.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/scoring/regional-readiness.ts
 * ============================================================
 */

export interface RegionalHistoryEvent {
  regionId: string;
  isSuccess: boolean;
  incidentCount: number; // e.g. Safety violations, route deviations
  hadLocalPartnerCoordination: boolean;
}

/**
 * Calculates a "Regional Power" signal.
 * An NGO might have high global trust, but low regional trust if they 
 * typically ignore local route hazards (like the Route 9 washout).
 */
export class RegionalReadinessEngine {
  /**
   * Returns a multiplier applied to trust (0.8 to 1.2).
   */
  static calculateMultiplier(events: RegionalHistoryEvent[]): number {
    if (events.length === 0) return 1.0;

    let successRate = 0;
    let localCoordinationBonus = 0;
    let incidentPenalty = 0;

    events.forEach((ev) => {
      if (ev.isSuccess) successRate++;
      if (ev.hadLocalPartnerCoordination) localCoordinationBonus += 0.05;
      
      // Heavy penalty for incident patterns (e.g. repeated route violations)
      if (ev.incidentCount > 0) incidentPenalty += (ev.incidentCount * 0.1);
    });

    const successPct = successRate / events.length;

    // Logic: 
    // High success (100%) + local coordination = ~1.2 boost.
    // High incidents = < 1.0 (Deduction).
    let multiplier = 0.8 + (successPct * 0.3) + Math.min(localCoordinationBonus, 0.1) - incidentPenalty;
    
    return parseFloat(Math.max(0.7, Math.min(multiplier, 1.3)).toFixed(2));
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/trust-engine/src/scoring/regional-readiness.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/scoring/regional-readiness.ts
 * ============================================================
 */

export interface RegionalHistoryEvent {
  regionId: string;
  isSuccess: boolean;
  incidentCount: number; // e.g. Safety violations, route deviations
  hadLocalPartnerCoordination: boolean;
}

/**
 * Calculates a "Regional Power" signal.
 * An NGO might have high global trust, but low regional trust if they 
 * typically ignore local route hazards (like the Route 9 washout).
 */
export class RegionalReadinessEngine {
  /**
   * Returns a multiplier applied to trust (0.8 to 1.2).
   */
  static calculateMultiplier(events: RegionalHistoryEvent[]): number {
    if (events.length === 0) return 1.0;

    let successRate = 0;
    let localCoordinationBonus = 0;
    let incidentPenalty = 0;

    events.forEach((ev) => {
      if (ev.isSuccess) successRate++;
      if (ev.hadLocalPartnerCoordination) localCoordinationBonus += 0.05;
      
      // Heavy penalty for incident patterns (e.g. repeated route violations)
      if (ev.incidentCount > 0) incidentPenalty += (ev.incidentCount * 0.1);
    });

    const successPct = successRate / events.length;

    // Logic: 
    // High success (100%) + local coordination = ~1.2 boost.
    // High incidents = < 1.0 (Deduction).
    let multiplier = 0.8 + (successPct * 0.3) + Math.min(localCoordinationBonus, 0.1) - incidentPenalty;
    
    return parseFloat(Math.max(0.7, Math.min(multiplier, 1.3)).toFixed(2));
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/trust-engine/src/scoring/regional-readiness.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/scoring/regional-readiness.ts
 * ============================================================
 */

export interface RegionalHistoryEvent {
  regionId: string;
  isSuccess: boolean;
  incidentCount: number; // e.g. Safety violations, route deviations
  hadLocalPartnerCoordination: boolean;
}

/**
 * Calculates a "Regional Power" signal.
 * An NGO might have high global trust, but low regional trust if they 
 * typically ignore local route hazards (like the Route 9 washout).
 */
export class RegionalReadinessEngine {
  /**
   * Returns a multiplier applied to trust (0.8 to 1.2).
   */
  static calculateMultiplier(events: RegionalHistoryEvent[]): number {
    if (events.length === 0) return 1.0;

    let successRate = 0;
    let localCoordinationBonus = 0;
    let incidentPenalty = 0;

    events.forEach((ev) => {
      if (ev.isSuccess) successRate++;
      if (ev.hadLocalPartnerCoordination) localCoordinationBonus += 0.05;
      
      // Heavy penalty for incident patterns (e.g. repeated route violations)
      if (ev.incidentCount > 0) incidentPenalty += (ev.incidentCount * 0.1);
    });

    const successPct = successRate / events.length;

    // Logic: 
    // High success (100%) + local coordination = ~1.2 boost.
    // High incidents = < 1.0 (Deduction).
    let multiplier = 0.8 + (successPct * 0.3) + Math.min(localCoordinationBonus, 0.1) - incidentPenalty;
    
    return parseFloat(Math.max(0.7, Math.min(multiplier, 1.3)).toFixed(2));
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/trust-engine/src/scoring/regional-readiness.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/scoring/regional-readiness.ts
 * ============================================================
 */

export interface RegionalHistoryEvent {
  regionId: string;
  isSuccess: boolean;
  incidentCount: number; // e.g. Safety violations, route deviations
  hadLocalPartnerCoordination: boolean;
}

/**
 * Calculates a "Regional Power" signal.
 * An NGO might have high global trust, but low regional trust if they 
 * typically ignore local route hazards (like the Route 9 washout).
 */
export class RegionalReadinessEngine {
  /**
   * Returns a multiplier applied to trust (0.8 to 1.2).
   */
  static calculateMultiplier(events: RegionalHistoryEvent[]): number {
    if (events.length === 0) return 1.0;

    let successRate = 0;
    let localCoordinationBonus = 0;
    let incidentPenalty = 0;

    events.forEach((ev) => {
      if (ev.isSuccess) successRate++;
      if (ev.hadLocalPartnerCoordination) localCoordinationBonus += 0.05;
      
      // Heavy penalty for incident patterns (e.g. repeated route violations)
      if (ev.incidentCount > 0) incidentPenalty += (ev.incidentCount * 0.1);
    });

    const successPct = successRate / events.length;

    // Logic: 
    // High success (100%) + local coordination = ~1.2 boost.
    // High incidents = < 1.0 (Deduction).
    let multiplier = 0.8 + (successPct * 0.3) + Math.min(localCoordinationBonus, 0.1) - incidentPenalty;
    
    return parseFloat(Math.max(0.7, Math.min(multiplier, 1.3)).toFixed(2));
  }
}
```
