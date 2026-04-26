
### packages/domain/src/entities/Task.ts
```typescript
/**
 * ============================================================
 * FILE: packages/domain/src/entities/Task.ts
 * ============================================================
 */

import { UserRole, VerificationStatus } from '@readycheck/core-types';

export type TaskExecutionStatus = 'INACTIVE' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';

/**
 * Represents a role-scoped operational directive or "Action Card".
 * Tasks are the atomic unit of deployment intent.
 */
export interface TaskEntity {
  id: string;
  deploymentPlanId: string;
  
  // Assignment Context
  assignedRole: UserRole;
  assignedUserId?: string;
  
  // Operational Details
  title: string;
  instructions: string;
  hazards: string[];
  mandatoryGears: string[];
  
  // Execution Logic
  executionStatus: TaskExecutionStatus;
  verificationStatus: VerificationStatus;
  
  // Ordering / Sequence
  orderIndex: number;
  reportBefore?: Date;
  
  // Verification Pointer
  assessmentId: string;
}

/**
 * Validates if the task is cleared for field execution.
 */
export function isTaskCleared(task: TaskEntity): boolean {
  return task.verificationStatus === 'VERIFIED_CLEARED';
}

/**
 * Checks if the task is actively preventing deployment progress.
 */
export function isTaskBlocking(task: TaskEntity): boolean {
  return (
    task.verificationStatus === 'BLOCKED' || 
    task.verificationStatus === 'NEEDS_CLARIFICATION'
  );
}
```
