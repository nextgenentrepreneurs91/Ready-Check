### packages/domain/src/entities/DeploymentPlan.ts
```typescript
/**
 * ============================================================
 * FILE: packages/domain/src/entities/DeploymentPlan.ts
 * ============================================================
 */

import { 
  DeploymentStatus, 
  GeoPolygon, 
  Task 
} from '@readycheck/core-types';

export interface ReadinessMetrics {
  totalRoles: number;
  verifiedCount: number;
  blockedCount: number;
  readinessRate: number; // 0 to 1
  isGated: boolean; // True if a mission-critical role is blocked
}

/**
 * The master strategic intent and coordination framework 
 * for a specific disaster response operation.
 */
export interface DeploymentPlanEntity {
  id: string;
  ngoId: string;
  coordinatorId: string;
  
  // High-Level Intent
  title: string;
  objective: string;
  status: DeploymentStatus;
  
  // Geographical Context
  regionName: string;
  boundary?: GeoPolygon;
  
  // Tactical Components
  tasks: Task[]; // Usually lazily loaded but typed here for the domain
  criticalRoles: string[]; // Role IDs that MUST be verified to launch
  
  // Decision Gating
  verificationThreshold: number; // e.g. 0.9 for 90%
  readiness: ReadinessMetrics;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  dispatchedAt?: Date;
}

/**
 * Core business logic to determine if a plan can transition to ACTIVE.
 */
export function canPlanBeDispatched(plan: DeploymentPlanEntity): boolean {
  if (plan.status !== 'PENDING_VERIFICATION') return false;
  
  const meetsThreshold = plan.readiness.readinessRate >= plan.verificationThreshold;
  const hasNoCriticalBlocks = !plan.readiness.isGated;

  return meetsThreshold && hasNoCriticalBlocks;
}
```
