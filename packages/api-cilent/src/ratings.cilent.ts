### packages/api-client/src/ratings.client.ts
```typescript
/**
 * ============================================================
 * FILE: packages/api-client/src/ratings.client.ts
 * ============================================================
 */

import { AxiosInstance } from 'axios';
import { EventRating, TrustScore } from '@readycheck/core-types';

export interface SubmitRatingRequest {
  deploymentPlanId: string;
  targetUserId?: string;
  targetNgoId?: string;
  score: number; // 0-100 or 1-5
  feedbackText: string;
  dimensions: TrustScore['dimensions']; // reliability, clarity, teamwork, followThrough
}

export interface TrustSummary {
  targetId: string;
  aggregateScore: number;
  totalRatingsCount: number;
  dimensionBreakdown: TrustScore['dimensions'];
  recentRatings: EventRating[];
}

/**
 * Client for managing post-deployment feedback and institutional trust signals.
 */
export class RatingsClient {
  constructor(private readonly client: AxiosInstance) {}

  /**
   * Retrieves historical feedback for a specific NGO or Operator.
   */
  async list(params: { targetId: string; targetType: 'USER' | 'NGO' }): Promise<EventRating[]> {
    const { data } = await this.client.get<EventRating[]>('/ratings', { params });
    return data;
  }

  /**
   * Submits a post-mission debrief to the Trust Engine.
   */
  async submit(payload: SubmitRatingRequest): Promise<EventRating> {
    const { data } = await this.client.post<EventRating>('/ratings', payload);
    return data;
  }

  /**
   * Fetches the rolled-up trust metrics for a target entity.
   */
  async getSummary(targetId: string, type: 'USER' | 'NGO'): Promise<TrustSummary> {
    const { data } = await this.client.get<TrustSummary>(`/ratings/summary/${type}/${targetId}`);
    return data;
  }
}
```
