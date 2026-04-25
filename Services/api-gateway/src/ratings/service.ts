### services/api-gateway/src/ratings/ratings.service.ts
```typescript
/**
 * ============================================================
 * FILE: services/api-gateway/src/ratings/ratings.service.ts
 * ============================================================
 */

import { Injectable } from '@nestjs/common';
import { EventRatingDimensions } from '@readycheck/core-types';

export interface RatingRecord {
  id: string;
  deploymentPlanId: string;
  evaluatorId: string;
  targetId: string; // User ID or NGO ID
  dimensions: EventRatingDimensions;
  overallSignal: number;
  comments?: string;
  createdAt: Date;
}

@Injectable()
export class RatingsService {
  /**
   * MOCK STORAGE
   * Post-deployment trust signals and performance feedback.
   */
  private readonly mockRatings: RatingRecord[] = [
    {
      id: 'rat_1',
      deploymentPlanId: 'dep_8092',
      evaluatorId: 'usr_coordinator_1',
      targetId: 'usr_91', // Marcus Reynolds
      dimensions: {
        preparedness: 5,
        clarity: 4,
        teamwork: 5,
        followThrough: 5
      },
      overallSignal: 95,
      comments: 'Excellent discipline during the bypass maneuver. Marcus ensured radio silence as instructed.',
      createdAt: new Date()
    }
  ];

  async findAllByTarget(targetId: string): Promise<RatingRecord[]> {
    return this.mockRatings.filter(r => r.targetId === targetId);
  }

  async submit(userId: string, data: Partial<RatingRecord>): Promise<RatingRecord> {
    const newRating: RatingRecord = {
      id: `rat_${Math.floor(Math.random() * 1000)}`,
      evaluatorId: userId,
      deploymentPlanId: data.deploymentPlanId!,
      targetId: data.targetId!,
      dimensions: data.dimensions!,
      overallSignal: this.calculateSignal(data.dimensions!),
      comments: data.comments,
      createdAt: new Date(),
    };

    this.mockRatings.push(newRating);
    return newRating;
  }

  async getTrustSummary(targetId: string) {
    const ratings = await this.findAllByTarget(targetId);
    if (ratings.length === 0) return { aggregateScore: 0, count: 0 };

    const totalSignal = ratings.reduce((acc, curr) => acc + curr.overallSignal, 0);
    return {
      aggregateScore: Math.round(totalSignal / ratings.length),
      count: ratings.length,
      latestFeedback: ratings[0].comments
    };
  }

  private calculateSignal(d: EventRatingDimensions): number {
    const avg = (d.preparedness + d.clarity + d.teamwork + d.followThrough) / 4;
    return (avg / 5) * 100;
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/api-gateway/src/ratings/ratings.service.ts
```typescript
/**
 * ============================================================
 * FILE: services/api-gateway/src/ratings/ratings.service.ts
 * ============================================================
 */

import { Injectable } from '@nestjs/common';
import { EventRatingDimensions } from '@readycheck/core-types';

export interface RatingRecord {
  id: string;
  deploymentPlanId: string;
  evaluatorId: string;
  targetId: string; // User ID or NGO ID
  dimensions: EventRatingDimensions;
  overallSignal: number;
  comments?: string;
  createdAt: Date;
}

@Injectable()
export class RatingsService {
  /**
   * MOCK STORAGE
   * Post-deployment trust signals and performance feedback.
   */
  private readonly mockRatings: RatingRecord[] = [
    {
      id: 'rat_1',
      deploymentPlanId: 'dep_8092',
      evaluatorId: 'usr_coordinator_1',
      targetId: 'usr_91', // Marcus Reynolds
      dimensions: {
        preparedness: 5,
        clarity: 4,
        teamwork: 5,
        followThrough: 5
      },
      overallSignal: 95,
      comments: 'Excellent discipline during the bypass maneuver. Marcus ensured radio silence as instructed.',
      createdAt: new Date()
    }
  ];

  async findAllByTarget(targetId: string): Promise<RatingRecord[]> {
    return this.mockRatings.filter(r => r.targetId === targetId);
  }

  async submit(userId: string, data: Partial<RatingRecord>): Promise<RatingRecord> {
    const newRating: RatingRecord = {
      id: `rat_${Math.floor(Math.random() * 1000)}`,
      evaluatorId: userId,
      deploymentPlanId: data.deploymentPlanId!,
      targetId: data.targetId!,
      dimensions: data.dimensions!,
      overallSignal: this.calculateSignal(data.dimensions!),
      comments: data.comments,
      createdAt: new Date(),
    };

    this.mockRatings.push(newRating);
    return newRating;
  }

  async getTrustSummary(targetId: string) {
    const ratings = await this.findAllByTarget(targetId);
    if (ratings.length === 0) return { aggregateScore: 0, count: 0 };

    const totalSignal = ratings.reduce((acc, curr) => acc + curr.overallSignal, 0);
    return {
      aggregateScore: Math.round(totalSignal / ratings.length),
      count: ratings.length,
      latestFeedback: ratings[0].comments
    };
  }

  private calculateSignal(d: EventRatingDimensions): number {
    const avg = (d.preparedness + d.clarity + d.teamwork + d.followThrough) / 4;
    return (avg / 5) * 100;
  }
}
```
