### packages/domain/src/entities/CollaborationRequest.ts
```typescript
/**
 * ============================================================
 * FILE: packages/domain/src/entities/CollaborationRequest.ts
 * ============================================================
 */

import { UserRole } from '@readycheck/core-types';

export type CollaborationUrgency = 'LOW' | 'MEDIUM' | 'HIGH' | 'IMMEDIATE';
export type CollaborationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';

/**
 * Formal request for cross-agency support. 
 * Allows a Coordinator from NGO A to request verified personnel or assets from NGO B.
 */
export interface CollaborationRequestEntity {
  id: string;
  
  // Actor Context
  requestingNgoId: string;
  requestingCoordinatorId: string;
  targetNgoId: string;
  
  // Tactical Context
  deploymentPlanId?: string;
  targetRegion: string;
  
  // Requirements
  capabilityNeed: string[];
  requiredRoles: UserRole[];
  urgency: CollaborationUrgency;
  
  // Decision Framework
  status: CollaborationStatus;
  rejectionReason?: string;
  
  // System Intelligence
  trustContextNote?: string; // AI generated context: e.g. "98% successful past overlap in this region"
  
  createdAt: Date;
  expiresAt: Date;
}

/**
 * Checks if a request is still valid for decision-making.
 */
export function isCollaborationRequestActive(request: CollaborationRequestEntity): boolean {
  return request.status === 'PENDING' && new Date() < request.expiresAt;
}
```
