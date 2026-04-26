### packages/domain/src/entities/EventRating.ts
```typescript
/**
 * ============================================================
 * FILE: packages/domain/src/entities/EventRating.ts
 * ============================================================
 */

export interface EventRatingDimensions {
  preparedness: number; // 1-5
  clarity: number;      // 1-5
  teamwork: number;     // 1-5
  followThrough: number;// 1-5
}

/**
 * Peer-to-peer or Coordinator-to-Operator feedback submitted 
 * after mission completion. Feeds the rolling Trust Index.
 */
export interface EventRatingEntity {
  id: string;
  deploymentPlanId: string;
  
  // Actor context
  evaluatorUserId: string;
  targetUserId?: string; // If rating an individual
  targetNgoId?: string;  // If rating an organization/partner
  
  // Scoring
  scores: EventRatingDimensions;
  overallSignal: number; // Calculated or manual summary (0-100)
  
  // Qualitative
  comments?: string;
  
  // Metadata
  createdAt: Date;
}

/**
 * Calculates a weighted overall signal from individual dimensions.
 */
export function calculateOverallSignal(scores: EventRatingDimensions): number {
  const average = (
    scores.preparedness + 
    scores.clarity + 
    scores.teamwork + 
    scores.followThrough
  ) / 4;
  
  return (average / 5) * 100;
}
```
