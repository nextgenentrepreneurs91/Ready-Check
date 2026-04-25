### services/readiness-engine/src/scoring/slot-availability.ts
```typescript
/**
 * ============================================================
 * FILE: services/readiness-engine/src/scoring/slot-availability.ts
 * ============================================================
 */

import { ReadinessCriticality } from '@readycheck/domain';

export type SlotStatus = 'EMPTY' | 'PENDING_VERIFICATION' | 'FILLED' | 'BLOCKED';

export interface DeploymentSlot {
  id: string;
  role: string;
  criticality: ReadinessCriticality;
  status: SlotStatus;
}

export interface AvailabilityImpact {
  isDeploymentBlocked: boolean;
  staffingFillRate: number; // 0-1
  readinessPenalty: number; // 0-100
  criticalGaps: string[];
}

/**
 * Evaluates the staffing readiness of a deployment plan.
 * A plan may have many volunteers, but if the 'MISSION_CRITICAL' medic slot 
 * is BLOCKED or EMPTY, the entire deployment is gated.
 */
export class SlotAvailabilityEngine {
  /**
   * Assesses the operational risks associated with current staffing levels.
   */
  static assess(slots: DeploymentSlot[]): AvailabilityImpact {
    if (slots.length === 0) {
      return { 
        isDeploymentBlocked: true, 
        staffingFillRate: 0, 
        readinessPenalty: 100, 
        criticalGaps: ['No roles defined for mission'] 
      };
    }

    const totalSlots = slots.length;
    const filledSlots = slots.filter(s => s.status === 'FILLED').length;
    const fillRate = filledSlots / totalSlots;

    const criticalSlots = slots.filter(s => s.criticality === 'MISSION_CRITICAL');
    const blockedCritical = criticalSlots.filter(s => s.status !== 'FILLED');

    // 1. Gating Logic: Any MISSION_CRITICAL slot not in 'FILLED' status blocks deployment.
    const isDeploymentBlocked = blockedCritical.length > 0;

    // 2. Penalty Calculation
    // Penalty is higher if essential roles are empty.
    let penalty = (1 - fillRate) * 50;
    if (isDeploymentBlocked) penalty += 50;

    return {
      isDeploymentBlocked,
      staffingFillRate: parseFloat(fillRate.toFixed(2)),
      readinessPenalty: Math.min(penalty, 100),
      criticalGaps: blockedCritical.map(s => `${s.role} slot is ${s.status}`)
    };
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/readiness-engine/src/scoring/slot-availability.ts
```typescript
/**
 * ============================================================
 * FILE: services/readiness-engine/src/scoring/slot-availability.ts
 * ============================================================
 */

import { ReadinessCriticality } from '@readycheck/domain';

export type SlotStatus = 'EMPTY' | 'PENDING_VERIFICATION' | 'FILLED' | 'BLOCKED';

export interface DeploymentSlot {
  id: string;
  role: string;
  criticality: ReadinessCriticality;
  status: SlotStatus;
}

export interface AvailabilityImpact {
  isDeploymentBlocked: boolean;
  staffingFillRate: number; // 0-1
  readinessPenalty: number; // 0-100
  criticalGaps: string[];
}

/**
 * Evaluates the staffing readiness of a deployment plan.
 * A plan may have many volunteers, but if the 'MISSION_CRITICAL' medic slot 
 * is BLOCKED or EMPTY, the entire deployment is gated.
 */
export class SlotAvailabilityEngine {
  /**
   * Assesses the operational risks associated with current staffing levels.
   */
  static assess(slots: DeploymentSlot[]): AvailabilityImpact {
    if (slots.length === 0) {
      return { 
        isDeploymentBlocked: true, 
        staffingFillRate: 0, 
        readinessPenalty: 100, 
        criticalGaps: ['No roles defined for mission'] 
      };
    }

    const totalSlots = slots.length;
    const filledSlots = slots.filter(s => s.status === 'FILLED').length;
    const fillRate = filledSlots / totalSlots;

    const criticalSlots = slots.filter(s => s.criticality === 'MISSION_CRITICAL');
    const blockedCritical = criticalSlots.filter(s => s.status !== 'FILLED');

    // 1. Gating Logic: Any MISSION_CRITICAL slot not in 'FILLED' status blocks deployment.
    const isDeploymentBlocked = blockedCritical.length > 0;

    // 2. Penalty Calculation
    // Penalty is higher if essential roles are empty.
    let penalty = (1 - fillRate) * 50;
    if (isDeploymentBlocked) penalty += 50;

    return {
      isDeploymentBlocked,
      staffingFillRate: parseFloat(fillRate.toFixed(2)),
      readinessPenalty: Math.min(penalty, 100),
      criticalGaps: blockedCritical.map(s => `${s.role} slot is ${s.status}`)
    };
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/readiness-engine/src/scoring/slot-availability.ts
```typescript
/**
 * ============================================================
 * FILE: services/readiness-engine/src/scoring/slot-availability.ts
 * ============================================================
 */

import { ReadinessCriticality } from '@readycheck/domain';

export type SlotStatus = 'EMPTY' | 'PENDING_VERIFICATION' | 'FILLED' | 'BLOCKED';

export interface DeploymentSlot {
  id: string;
  role: string;
  criticality: ReadinessCriticality;
  status: SlotStatus;
}

export interface AvailabilityImpact {
  isDeploymentBlocked: boolean;
  staffingFillRate: number; // 0-1
  readinessPenalty: number; // 0-100
  criticalGaps: string[];
}

/**
 * Evaluates the staffing readiness of a deployment plan.
 * A plan may have many volunteers, but if the 'MISSION_CRITICAL' medic slot 
 * is BLOCKED or EMPTY, the entire deployment is gated.
 */
export class SlotAvailabilityEngine {
  /**
   * Assesses the operational risks associated with current staffing levels.
   */
  static assess(slots: DeploymentSlot[]): AvailabilityImpact {
    if (slots.length === 0) {
      return { 
        isDeploymentBlocked: true, 
        staffingFillRate: 0, 
        readinessPenalty: 100, 
        criticalGaps: ['No roles defined for mission'] 
      };
    }

    const totalSlots = slots.length;
    const filledSlots = slots.filter(s => s.status === 'FILLED').length;
    const fillRate = filledSlots / totalSlots;

    const criticalSlots = slots.filter(s => s.criticality === 'MISSION_CRITICAL');
    const blockedCritical = criticalSlots.filter(s => s.status !== 'FILLED');

    // 1. Gating Logic: Any MISSION_CRITICAL slot not in 'FILLED' status blocks deployment.
    const isDeploymentBlocked = blockedCritical.length > 0;

    // 2. Penalty Calculation
    // Penalty is higher if essential roles are empty.
    let penalty = (1 - fillRate) * 50;
    if (isDeploymentBlocked) penalty += 50;

    return {
      isDeploymentBlocked,
      staffingFillRate: parseFloat(fillRate.toFixed(2)),
      readinessPenalty: Math.min(penalty, 100),
      criticalGaps: blockedCritical.map(s => `${s.role} slot is ${s.status}`)
    };
  }
}
```
