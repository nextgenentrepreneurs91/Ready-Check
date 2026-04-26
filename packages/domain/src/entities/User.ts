### packages/domain/src/entities/User.ts
```typescript
/**
 * ============================================================
 * FILE: packages/domain/src/entities/User.ts
 * ============================================================
 */

import { UserRole } from '@readycheck/core-types';

export type UserDeploymentStatus = 'AVAILABLE' | 'DEPLOYED' | 'RESTING' | 'INACTIVE';

/**
 * Domain representation of an individual operator or stakeholder 
 * in the ReadyCheck trust network.
 */
export interface UserEntity {
  id: string;
  name: string;
  email: string;
  
  // Role & Affiliation
  roles: UserRole[];
  primaryRole: UserRole;
  ngoId: string;
  
  // Geography & Operation Context
  preferredRegion?: string;
  activeRegionId?: string;
  
  // Readiness & Operational State
  status: UserDeploymentStatus;
  currentTrustIndex: number; // 0-100
  isClearanceActive: boolean; // Background check / certification valid
  
  // Meta
  lastDeploymentAt?: Date;
  joinedAt: Date;
}

/**
 * Helper to determine if a user can be legally assigned to a mission
 */
export function isUserReadyForMission(user: UserEntity): boolean {
  return (
    user.status === 'AVAILABLE' && 
    user.isClearanceActive && 
    user.currentTrustIndex >= 70 // Operational baseline trust threshold
  );
}
```
