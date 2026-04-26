### packages/domain/src/entities/Feedback.ts
```typescript
/**
 * ============================================================
 * FILE: packages/domain/src/entities/Feedback.ts
 * ============================================================
 */

export type FeedbackCategory = 'OPERATIONAL' | 'SAFETY' | 'COMMUNICATION' | 'INFRASTRUCTURE';
export type FeedbackSentiment = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'CRITICAL';
export type FeedbackStatus = 'PENDING' | 'REVIEWED' | 'ACTIONED' | 'DISMISSED';

/**
 * Capture qualitative reports from the field or partners regarding 
 * the health and accuracy of the deployment plans and reality-checks.
 */
export interface FeedbackEntity {
  id: string;
  deploymentPlanId?: string;
  taskId?: string; // Optional link to specific role instruction
  
  // Actor identifiers
  sourceUserId: string;
  targetNgoId?: string;
  
  // Content
  category: FeedbackCategory;
  sentiment: FeedbackSentiment;
  message: string;
  
  // Lifecycle
  status: FeedbackStatus;
  resolutionNote?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

/**
 * High-priority feedback that requires immediate Coordinator intervention.
 */
export function isUrgentFeedback(feedback: FeedbackEntity): boolean {
  return (
    feedback.sentiment === 'CRITICAL' || 
    (feedback.category === 'SAFETY' && feedback.status === 'PENDING')
  );
}
```
