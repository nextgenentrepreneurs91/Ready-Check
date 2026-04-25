### services/trust-engine/src/scoring/feedback-weighting.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/scoring/feedback-weighting.ts
 * ============================================================
 */

export interface FeedbackSignal {
  sourceTrustScore: number; // 0-100 (Trust Index of the evaluator)
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  createdAt: Date;
  isCorroborated: boolean; // Multiple sources flagging the same event
}

/**
 * Common logic for assessing the "Strength" of a feedback signal.
 * Low-trust sources or outdated feedback are automatically dampened.
 */
export class FeedbackWeightingEngine {
  /**
   * Returns a signal strength multiplier (0.1 to 2.0).
   */
  static getStrength(signal: FeedbackSignal): number {
    let multiplier = 1.0;

    // 1. Source Credibility: High-trust coordinators provide stronger signals.
    // Sources with < 40 Trust Index have their feedback dampened by 50%.
    if (signal.sourceTrustScore > 90) multiplier *= 1.5;
    if (signal.sourceTrustScore < 40) multiplier *= 0.5;

    // 2. Recency: Feedback older than 90 days is exponentially less relevant.
    const ageDays = (Date.now() - signal.createdAt.getTime()) / (1000 * 60 * 60 * 24);
    if (ageDays > 90) multiplier *= 0.2;
    else if (ageDays > 30) multiplier *= 0.6;

    // 3. Severity & Corroboration:
    // A single unverified "CRITICAL" flag is noisy. 
    // A corroborated "CRITICAL" flag is a major operational signal.
    if (signal.severity === 'CRITICAL') {
      multiplier *= signal.isCorroborated ? 2.0 : 1.0;
    } else if (signal.isCorroborated) {
      multiplier *= 1.25;
    }

    return parseFloat(multiplier.toFixed(2));
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/trust-engine/src/scoring/feedback-weighting.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/scoring/feedback-weighting.ts
 * ============================================================
 */

export interface FeedbackSignal {
  sourceTrustScore: number; // 0-100 (Trust Index of the evaluator)
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  createdAt: Date;
  isCorroborated: boolean; // Multiple sources flagging the same event
}

/**
 * Common logic for assessing the "Strength" of a feedback signal.
 * Low-trust sources or outdated feedback are automatically dampened.
 */
export class FeedbackWeightingEngine {
  /**
   * Returns a signal strength multiplier (0.1 to 2.0).
   */
  static getStrength(signal: FeedbackSignal): number {
    let multiplier = 1.0;

    // 1. Source Credibility: High-trust coordinators provide stronger signals.
    // Sources with < 40 Trust Index have their feedback dampened by 50%.
    if (signal.sourceTrustScore > 90) multiplier *= 1.5;
    if (signal.sourceTrustScore < 40) multiplier *= 0.5;

    // 2. Recency: Feedback older than 90 days is exponentially less relevant.
    const ageDays = (Date.now() - signal.createdAt.getTime()) / (1000 * 60 * 60 * 24);
    if (ageDays > 90) multiplier *= 0.2;
    else if (ageDays > 30) multiplier *= 0.6;

    // 3. Severity & Corroboration:
    // A single unverified "CRITICAL" flag is noisy. 
    // A corroborated "CRITICAL" flag is a major operational signal.
    if (signal.severity === 'CRITICAL') {
      multiplier *= signal.isCorroborated ? 2.0 : 1.0;
    } else if (signal.isCorroborated) {
      multiplier *= 1.25;
    }

    return parseFloat(multiplier.toFixed(2));
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/trust-engine/src/scoring/feedback-weighting.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/scoring/feedback-weighting.ts
 * ============================================================
 */

export interface FeedbackSignal {
  sourceTrustScore: number; // 0-100 (Trust Index of the evaluator)
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  createdAt: Date;
  isCorroborated: boolean; // Multiple sources flagging the same event
}

/**
 * Common logic for assessing the "Strength" of a feedback signal.
 * Low-trust sources or outdated feedback are automatically dampened.
 */
export class FeedbackWeightingEngine {
  /**
   * Returns a signal strength multiplier (0.1 to 2.0).
   */
  static getStrength(signal: FeedbackSignal): number {
    let multiplier = 1.0;

    // 1. Source Credibility: High-trust coordinators provide stronger signals.
    // Sources with < 40 Trust Index have their feedback dampened by 50%.
    if (signal.sourceTrustScore > 90) multiplier *= 1.5;
    if (signal.sourceTrustScore < 40) multiplier *= 0.5;

    // 2. Recency: Feedback older than 90 days is exponentially less relevant.
    const ageDays = (Date.now() - signal.createdAt.getTime()) / (1000 * 60 * 60 * 24);
    if (ageDays > 90) multiplier *= 0.2;
    else if (ageDays > 30) multiplier *= 0.6;

    // 3. Severity & Corroboration:
    // A single unverified "CRITICAL" flag is noisy. 
    // A corroborated "CRITICAL" flag is a major operational signal.
    if (signal.severity === 'CRITICAL') {
      multiplier *= signal.isCorroborated ? 2.0 : 1.0;
    } else if (signal.isCorroborated) {
      multiplier *= 1.25;
    }

    return parseFloat(multiplier.toFixed(2));
  }
}
```
