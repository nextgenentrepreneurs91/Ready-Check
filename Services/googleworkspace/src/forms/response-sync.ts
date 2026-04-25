### services/google-workspace/src/forms/response-sync.ts
```typescript
/**
 * ============================================================
 * FILE: services/google-workspace/src/forms/response-sync.ts
 * ============================================================
 */

import { AssessmentEntity, UserAssessmentAttempt } from '@readycheck/domain';
import { createLogger } from '@readycheck/utils';

const logger = createLogger('Google:ResponseSync');

/**
 * Logic for Ingres: Pulling external Google Form data into the 
 * ReadyCheck Misunderstanding Detection engine.
 */
export class FormResponseSync {
  /**
   * Normalizes raw Google Forms API response data into a ReadyCheck Assessment Attempt.
   */
  static normalize(
    rawResponse: any, 
    assessment: AssessmentEntity
  ): UserAssessmentAttempt {
    logger.debug(`Normalizing response for user: ${rawResponse.respondentEmail}`);

    const selectedIndexes: number[] = [];

    // Map raw answers back to indices based on assessment definition
    assessment.questions.forEach((q, idx) => {
      const rawAnswer = rawResponse.answers?.[q.id];
      const selectedText = rawAnswer?.textAnswers?.answers?.[0]?.value;
      
      const optionIndex = q.options.indexOf(selectedText);
      selectedIndexes.push(optionIndex);
    });

    // Determine correctness using domain logic
    const isCorrect = assessment.questions.every((q, idx) => {
      return q.correctOptionIndex === selectedIndexes[idx];
    });

    return {
      attemptNumber: assessment.attempts.length + 1,
      selectedIndexes,
      isCorrect,
      answeredAt: new Date(rawResponse.createTime || Date.now()),
    };
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/google-workspace/src/forms/response-sync.ts
```typescript
/**
 * ============================================================
 * FILE: services/google-workspace/src/forms/response-sync.ts
 * ============================================================
 */

import { AssessmentEntity, UserAssessmentAttempt } from '@readycheck/domain';
import { createLogger } from '@readycheck/utils';

const logger = createLogger('Google:ResponseSync');

/**
 * Logic for Ingres: Pulling external Google Form data into the 
 * ReadyCheck Misunderstanding Detection engine.
 */
export class FormResponseSync {
  /**
   * Normalizes raw Google Forms API response data into a ReadyCheck Assessment Attempt.
   */
  static normalize(
    rawResponse: any, 
    assessment: AssessmentEntity
  ): UserAssessmentAttempt {
    logger.debug(`Normalizing response for user: ${rawResponse.respondentEmail}`);

    const selectedIndexes: number[] = [];

    // Map raw answers back to indices based on assessment definition
    assessment.questions.forEach((q, idx) => {
      const rawAnswer = rawResponse.answers?.[q.id];
      const selectedText = rawAnswer?.textAnswers?.answers?.[0]?.value;
      
      const optionIndex = q.options.indexOf(selectedText);
      selectedIndexes.push(optionIndex);
    });

    // Determine correctness using domain logic
    const isCorrect = assessment.questions.every((q, idx) => {
      return q.correctOptionIndex === selectedIndexes[idx];
    });

    return {
      attemptNumber: (assessment.attempts?.length || 0) + 1,
      selectedIndexes,
      isCorrect,
      answeredAt: new Date(rawResponse.createTime || Date.now()),
    };
  }
}
```
