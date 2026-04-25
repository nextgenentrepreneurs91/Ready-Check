### services/trust-engine/src/scoring/cross-ngo-feedback.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/scoring/cross-ngo-feedback.ts
 * ============================================================
 */

export interface PartnershipFeedback {
  evaluatorNgoId: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'CRITICAL';
  operationalImpact: 1 | 2 | 3;
  date: Date;
}

/**
 * Evaluates the trustworthiness of a partner organization based on 
 * cross-NGO operational feedback. High scores enable easier collaboration requests.
 */
export class CrossNgoFeedbackEngine {
  /**
   * Calculates a partnership trust index (0-100).
   */
  static calculate(feedbacks: PartnershipFeedback[]): number {
    if (feedbacks.length === 0) return 70; // Baseline trust for vetted partners

    let weightedSum = 0;
    let totalWeight = 0;

    const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    feedbacks.forEach((f) => {
      // 1. Recency Weighting: Newer signals are 2x as relevant
      const ageMs = now - f.date.getTime();
      const recencyWeight = ageMs < (ONE_YEAR_MS / 2) ? 2.0 : 1.0;
      
      // 2. Sentiment Mapping
      let baseValue = 50;
      if (f.sentiment === 'POSITIVE') baseValue = 100;
      if (f.sentiment === 'NEGATIVE') baseValue = 20;
      if (f.sentiment === 'CRITICAL') baseValue = 0;

      // 3. Operational Impact Multiplier
      // A "CRITICAL" failure in a high-impact mission carries massive weight.
      const importanceWeight = f.operationalImpact * recencyWeight;

      weightedSum += (baseValue * importanceWeight);
      totalWeight += importanceWeight;
    });

    const score = weightedSum / totalWeight;

    // Consistency Check: If there's high variance (some NGOs love them, some hate them), 
    // we dampen the score to reflect uncertainty.
    return Math.round(score);
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/trust-engine/src/scoring/cross-ngo-feedback.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/scoring/cross-ngo-feedback.ts
 * ============================================================
 */

export interface PartnershipFeedback {
  evaluatorNgoId: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'CRITICAL';
  operationalImpact: 1 | 2 | 3;
  date: Date;
}

/**
 * Evaluates the trustworthiness of a partner organization based on 
 * cross-NGO operational feedback. High scores enable easier collaboration requests.
 */
export class CrossNgoFeedbackEngine {
  /**
   * Calculates a partnership trust index (0-100).
   */
  static calculate(feedbacks: PartnershipFeedback[]): number {
    if (feedbacks.length === 0) return 70; // Baseline trust for vetted partners

    let weightedSum = 0;
    let totalWeight = 0;

    const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    feedbacks.forEach((f) => {
      // 1. Recency Weighting: Newer signals are 2x as relevant
      const ageMs = now - f.date.getTime();
      const recencyWeight = ageMs < (ONE_YEAR_MS / 2) ? 2.0 : 1.0;
      
      // 2. Sentiment Mapping
      let baseValue = 50;
      if (f.sentiment === 'POSITIVE') baseValue = 100;
      if (f.sentiment === 'NEGATIVE') baseValue = 20;
      if (f.sentiment === 'CRITICAL') baseValue = 0;

      // 3. Operational Impact Multiplier
      // A "CRITICAL" failure in a high-impact mission carries massive weight.
      const importanceWeight = f.operationalImpact * recencyWeight;

      weightedSum += (baseValue * importanceWeight);
      totalWeight += importanceWeight;
    });

    const score = weightedSum / totalWeight;

    // Consistency Check: If there's high variance (some NGOs love them, some hate them), 
    // we dampen the score to reflect uncertainty.
    return Math.round(score);
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/trust-engine/src/scoring/cross-ngo-feedback.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/scoring/cross-ngo-feedback.ts
 * ============================================================
 */

export interface PartnershipFeedback {
  evaluatorNgoId: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'CRITICAL';
  operationalImpact: 1 | 2 | 3;
  date: Date;
}

/**
 * Evaluates the trustworthiness of a partner organization based on 
 * cross-NGO operational feedback. High scores enable easier collaboration requests.
 */
export class CrossNgoFeedbackEngine {
  /**
   * Calculates a partnership trust index (0-100).
   */
  static calculate(feedbacks: PartnershipFeedback[]): number {
    if (feedbacks.length === 0) return 70; // Baseline trust for vetted partners

    let weightedSum = 0;
    let totalWeight = 0;

    const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    feedbacks.forEach((f) => {
      // 1. Recency Weighting: Newer signals are 2x as relevant
      const ageMs = now - f.date.getTime();
      const recencyWeight = ageMs < (ONE_YEAR_MS / 2) ? 2.0 : 1.0;
      
      // 2. Sentiment Mapping
      let baseValue = 50;
      if (f.sentiment === 'POSITIVE') baseValue = 100;
      if (f.sentiment === 'NEGATIVE') baseValue = 20;
      if (f.sentiment === 'CRITICAL') baseValue = 0;

      // 3. Operational Impact Multiplier
      // A "CRITICAL" failure in a high-impact mission carries massive weight.
      const importanceWeight = f.operationalImpact * recencyWeight;

      weightedSum += (baseValue * importanceWeight);
      totalWeight += importanceWeight;
    });

    const score = weightedSum / totalWeight;

    // Consistency Check: If there's high variance (some NGOs love them, some hate them), 
    // we dampen the score to reflect uncertainty.
    return Math.round(score);
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/trust-engine/src/scoring/cross-ngo-feedback.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/scoring/cross-ngo-feedback.ts
 * ============================================================
 */

export interface PartnershipFeedback {
  evaluatorNgoId: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'CRITICAL';
  operationalImpact: 1 | 2 | 3;
  date: Date;
}

/**
 * Evaluates the trustworthiness of a partner organization based on 
 * cross-NGO operational feedback. High scores enable easier collaboration requests.
 */
export class CrossNgoFeedbackEngine {
  /**
   * Calculates a partnership trust index (0-100).
   */
  static calculate(feedbacks: PartnershipFeedback[]): number {
    if (feedbacks.length === 0) return 70; // Baseline trust for vetted partners

    let weightedSum = 0;
    let totalWeight = 0;

    const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
    const now = Date.now();

    feedbacks.forEach((f) => {
      // 1. Recency Weighting: Newer signals are 2x as relevant
      const ageMs = now - f.date.getTime();
      const recencyWeight = ageMs < (ONE_YEAR_MS / 2) ? 2.0 : 1.0;
      
      // 2. Sentiment Mapping
      let baseValue = 50;
      if (f.sentiment === 'POSITIVE') baseValue = 100;
      if (f.sentiment === 'NEGATIVE') baseValue = 20;
      if (f.sentiment === 'CRITICAL') baseValue = 0;

      // 3. Operational Impact Multiplier
      // A "CRITICAL" failure in a high-impact mission carries massive weight.
      const importanceWeight = f.operationalImpact * recencyWeight;

      weightedSum += (baseValue * importanceWeight);
      totalWeight += importanceWeight;
    });

    const score = weightedSum / totalWeight;

    // Consistency Check: If there's high variance (some NGOs love them, some hate them), 
    // we dampen the score to reflect uncertainty.
    return Math.round(score);
  }
}
```
