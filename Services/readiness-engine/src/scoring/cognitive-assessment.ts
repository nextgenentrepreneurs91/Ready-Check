### services/readiness-engine/src/scoring/cognitive-assessment.ts
```typescript
/**
 * ============================================================
 * FILE: services/readiness-engine/src/scoring/cognitive-assessment.ts
 * ============================================================
 */

import { clampScore } from '@readycheck/utils';

export interface AssessmentPoint {
  questionId: string;
  isCorrect: boolean;
  attempts: number;
  isSafetyCritical: boolean;
}

/**
 * Quantifies "Actionable Understanding." 
 * Unlike academic testing, this engine penalizes repetitive attempts at 
 * safety-critical instructions, as these indicate a failure in grounding.
 */
export class CognitiveAssessmentScorer {
  /**
   * Calculates a weighted readiness score out of 100.
   */
  static calculate(points: AssessmentPoint[]): number {
    if (points.length === 0) return 0;

    let baseScore = 0;
    const totalPoints = points.length;

    points.forEach((p) => {
      if (!p.isCorrect) return;

      // Correct first-time: Full points (100)
      // Correct on retry: Reduced points (60)
      // Correct on third attempt: Minimal points (30)
      let questionValue = p.attempts === 1 ? 100 : p.attempts === 2 ? 60 : 30;

      // Safety critical questions carry 2x weight (penalty is effectively higher)
      if (p.isSafetyCritical && p.attempts > 1) {
        questionValue *= 0.5; // Significant reliability deduction
      }

      baseScore += questionValue;
    });

    return clampScore(baseScore / totalPoints);
  }

  /**
   * Determines if the specific pattern of errors suggests systemic confusion.
   */
  static detectSystemicConfusion(points: AssessmentPoint[]): boolean {
    const safetyFailures = points.filter(p => p.isSafetyCritical && !p.isCorrect);
    const retryBursts = points.filter(p => p.attempts > 3);
    
    return safetyFailures.length > 0 || retryBursts.length > 2;
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/readiness-engine/src/scoring/cognitive-assessment.ts
```typescript
/**
 * ============================================================
 * FILE: services/readiness-engine/src/scoring/cognitive-assessment.ts
 * ============================================================
 */

import { clampScore } from '@readycheck/utils';

export interface AssessmentPoint {
  questionId: string;
  isCorrect: boolean;
  attempts: number;
  isSafetyCritical: boolean;
}

/**
 * Quantifies "Actionable Understanding." 
 * Unlike academic testing, this engine penalizes repetitive attempts at 
 * safety-critical instructions, as these indicate a failure in grounding.
 */
export class CognitiveAssessmentScorer {
  /**
   * Calculates a weighted readiness score out of 100.
   */
  static calculate(points: AssessmentPoint[]): number {
    if (points.length === 0) return 0;

    let totalWeightedPoints = 0;
    let earnedWeightedPoints = 0;

    points.forEach((p) => {
      const weight = p.isSafetyCritical ? 2 : 1;
      totalWeightedPoints += 100 * weight;

      if (!p.isCorrect) return;

      // Correct first-time: Full points (100)
      // Correct on retry: Reduced points (60)
      // Correct on third attempt+: Minimal points (30)
      let rawPoints = p.attempts === 1 ? 100 : p.attempts === 2 ? 60 : 30;
      
      earnedWeightedPoints += rawPoints * weight;
    });

    return clampScore((earnedWeightedPoints / totalWeightedPoints) * 100);
  }

  /**
   * Determines if the specific pattern of errors suggests systemic confusion.
   */
  static detectSystemicConfusion(points: AssessmentPoint[]): boolean {
    const safetyFailures = points.filter(p => p.isSafetyCritical && !p.isCorrect);
    const retryBursts = points.filter(p => p.attempts > 3);
    
    return safetyFailures.length > 0 || retryBursts.length > 2;
  }
}
```
