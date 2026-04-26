### packages/domain/src/entities/QualificationDecision.ts
```typescript
/**
 * ============================================================
 * FILE: packages/domain/src/entities/QualificationDecision.ts
 * ============================================================
 */

export type DecisionStatus = 'VERIFIED' | 'NEEDS_ATTENTION' | 'BLOCKED';

/**
 * The formal result of a Readiness Assessment. 
 * This entity determines if the platform "gates" or "clears" the operator.
 */
export interface QualificationDecisionEntity {
  id: string;
  userId: string;
  assessmentId: string;
  
  // High-level state
  status: DecisionStatus;
  
  // Performance Analytics
  readinessScore: number; // 0-100 scale derived from assessment accuracy and speed
  confidenceLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  
  // Transparency & Correction Loop (The "Why")
  rationale: string; // e.g., "User repeatedly failed the fallback routing question."
  remediationSuggestions: string[]; // e.g., ["Re-read Section 4: Highway 41 Bypass"]
  
  // Decision Lifecycle
  decidedAt: Date;
  expiresAt?: Date; // Decisions might be time-bound to the disaster window
  isOverride: boolean; // Flagged if a Coordinator manually cleared a failure
}

/**
 * Logic to check if the decision requires immediate Coordinator intervention.
 */
export function requiresIntervention(decision: QualificationDecisionEntity): boolean {
  return decision.status === 'BLOCKED' || (decision.status === 'NEEDS_ATTENTION' && decision.confidenceLevel === 'LOW');
}
```
