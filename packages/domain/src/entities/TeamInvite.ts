### packages/domain/src/entities/TeamInvite.ts
```typescript
/**
 * ============================================================
 * FILE: packages/domain/src/entities/TeamInvite.ts
 * ============================================================
 */

import { UserRole } from '@readycheck/core-types';

export type TeamInviteStatus = 'PENDING' | 'ACCEPTED' | 'EXPIRED' | 'REVOKED';

/**
 * A secure, time-bound onboarding mechanism for civilians or 
 * partner agency personnel.
 */
export interface TeamInviteEntity {
  id: string;
  
  // Actor context
  inviterUserId: string;
  inviterNgoId: string;
  inviteeEmail: string; // The primary key for targeting
  
  // Assignment Context
  targetDeploymentPlanId: string;
  targetRole: UserRole;
  
  // Lifecycle & Security
  inviteToken: string; // Cryptographic hash
  status: TeamInviteStatus;
  
  // Timestamps
  createdAt: Date;
  expiresAt: Date;
  
  // Acceptance metadata
  acceptedAt?: Date;
  acceptedByUserId?: string; // Links to the newly created/assigned UserEntity
}

/**
 * Validates if the invite token can be processed.
 */
export function isInviteValid(invite: TeamInviteEntity): boolean {
  return invite.status === 'PENDING' && new Date() < invite.expiresAt;
}
```
