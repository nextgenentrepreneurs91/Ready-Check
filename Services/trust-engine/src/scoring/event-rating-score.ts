### services/trust-engine/src/scoring/event-rating-score.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/scoring/event-rating-score.ts
 * ============================================================
 */

import { EventRatingDimensions } from '@readycheck/core-types';

export interface RatingContribution {
  score: number; // 0-100 normalized
  delta: number; // Impact on the rolling Trust Index (e.g., -5, +3)
  breakdown: {
    strength: string;
    weakness?: string;
  };
}

/**
 * Translates qualitative peer/coordinator ratings into quantitative 
 * trust signals.
 */
export class EventRatingScorer {
  /**
   * Processes a peer-reviewed mission rating into a trust signal.
   */
  static analyze(dimensions: EventRatingDimensions): RatingContribution {
    const { preparedness, clarity, teamwork, followThrough } = dimensions;

    // 1. Normalize average (1-5 scale to 0-100)
    const averageRaw = (preparedness + clarity + teamwork + followThrough) / 4;
    const score = (averageRaw / 5) * 100;

    // 2. Calculate Trust Delta
    // Average rating (3/5) is neutral (delta 0).
    // Perfect rating (5/5) adds +5.
    // Critical failure (1/5) removes -15.
    let delta = 0;
    if (score >= 90) delta = 5;
    else if (score >= 70) delta = 2;
    else if (score < 40) delta = -15;
    else if (score < 60) delta = -5;

    // 3. Identify Strengths/Weaknesses
    const signals = [
      { key: 'preparedness', val: preparedness },
      { key: 'clarity', val: clarity },
      { key: 'teamwork', val: teamwork },
      { key: 'follow-through', val: followThrough }
    ];

    const strength = signals.reduce((prev, curr) => curr.val > prev.val ? curr : prev).key;
    const weaknessSignal = signals.reduce((prev, curr) => curr.val < prev.val ? curr : prev);
    const weakness = weaknessSignal.val < 3 ? weaknessSignal.key : undefined;

    return {
      score: Math.round(score),
      delta,
      breakdown: {
        strength: `Strongest alignment in ${strength}.`,
        weakness: weakness ? `Readiness gap detected in ${weakness}.` : undefined
      }
    };
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/trust-engine/src/scoring/event-rating-score.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/scoring/event-rating-score.ts
 * ============================================================
 */

import { EventRatingDimensions } from '@readycheck/core-types';

export interface RatingContribution {
  score: number; // 0-100 normalized
  delta: number; // Impact on the rolling Trust Index (e.g., -5, +3)
  breakdown: {
    strength: string;
    weakness?: string;
  };
}

/**
 * Translates qualitative peer/coordinator ratings into quantitative 
 * trust signals.
 */
export class EventRatingScorer {
  /**
   * Processes a peer-reviewed mission rating into a trust signal.
   */
  static analyze(dimensions: EventRatingDimensions): RatingContribution {
    const { preparedness, clarity, teamwork, followThrough } = dimensions;

    // 1. Normalize average (1-5 scale to 0-100)
    const averageRaw = (preparedness + clarity + teamwork + followThrough) / 4;
    const score = (averageRaw / 5) * 100;

    // 2. Calculate Trust Delta
    // Average rating (3/5) is neutral (delta 0).
    // Perfect rating (5/5) adds +5.
    // Critical failure (1/5) removes -15.
    let delta = 0;
    if (score >= 90) delta = 5;
    else if (score >= 70) delta = 2;
    else if (score < 40) delta = -15;
    else if (score < 60) delta = -5;

    // 3. Identify Strengths/Weaknesses
    const signals = [
      { key: 'preparedness', val: preparedness },
      { key: 'clarity', val: clarity },
      { key: 'teamwork', val: teamwork },
      { key: 'follow-through', val: followThrough }
    ];

    const strength = signals.reduce((prev, curr) => curr.val > prev.val ? curr : prev).key;
    const weaknessSignal = signals.reduce((prev, curr) => curr.val < prev.val ? curr : prev);
    const weakness = weaknessSignal.val < 3 ? weaknessSignal.key : undefined;

    return {
      score: Math.round(score),
      delta,
      breakdown: {
        strength: `Strongest alignment in ${strength}.`,
        weakness: weakness ? `Readiness gap detected in ${weakness}.` : undefined
      }
    };
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/trust-engine/src/scoring/event-rating-score.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/scoring/event-rating-score.ts
 * ============================================================
 */

import { EventRatingDimensions } from '@readycheck/core-types';

export interface RatingContribution {
  score: number; // 0-100 normalized
  delta: number; // Impact on the rolling Trust Index (e.g., -5, +3)
  breakdown: {
    strength: string;
    weakness?: string;
  };
}

/**
 * Translates qualitative peer/coordinator ratings into quantitative 
 * trust signals.
 */
export class EventRatingScorer {
  /**
   * Processes a peer-reviewed mission rating into a trust signal.
   */
  static analyze(dimensions: EventRatingDimensions): RatingContribution {
    const { preparedness, clarity, teamwork, followThrough } = dimensions;

    // 1. Normalize average (1-5 scale to 0-100)
    const averageRaw = (preparedness + clarity + teamwork + followThrough) / 4;
    const score = (averageRaw / 5) * 100;

    // 2. Calculate Trust Delta
    // Average rating (3/5) is neutral (delta 0).
    // Perfect rating (5/5) adds +5.
    // Critical failure (1/5) removes -15.
    let delta = 0;
    if (score >= 90) delta = 5;
    else if (score >= 70) delta = 2;
    else if (score < 40) delta = -15;
    else if (score < 60) delta = -5;

    // 3. Identify Strengths/Weaknesses
    const signals = [
      { key: 'preparedness', val: preparedness },
      { key: 'clarity', val: clarity },
      { key: 'teamwork', val: teamwork },
      { key: 'follow-through', val: followThrough }
    ];

    const strength = signals.reduce((prev, curr) => curr.val > prev.val ? curr : prev).key;
    const weaknessSignal = signals.reduce((prev, curr) => curr.val < prev.val ? curr : prev);
    const weakness = weaknessSignal.val < 3 ? weaknessSignal.key : undefined;

    return {
      score: Math.round(score),
      delta,
      breakdown: {
        strength: `Strongest alignment in ${strength}.`,
        weakness: weakness ? `Readiness gap detected in ${weakness}.` : undefined
      }
    };
  }
}
```
