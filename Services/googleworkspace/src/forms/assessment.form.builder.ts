### services/google-workspace/src/forms/assessment-form.builder.ts
```typescript
/**
 * ============================================================
 * FILE: services/google-workspace/src/forms/assessment-form.builder.ts
 * ============================================================
 */

import { AssessmentEntity } from '@readycheck/domain';
import { FormQuestion } from './forms.client';

/**
 * Handles the structural translation between internal Readiness Assessments 
 * and external Google Form presentation layers.
 */
export class AssessmentFormBuilder {
  /**
   * Transforms a domain entity into a Google Form-compatible payload.
   */
  static buildFromEntity(entity: AssessmentEntity): { title: string; items: FormQuestion[] } {
    const roleLabel = entity.roleScope.replace('_', ' ').toUpperCase();
    
    return {
      title: `[READYCHECK] ${roleLabel}: Operational Verification`,
      items: entity.questions.map(q => ({
        title: q.text,
        options: q.options,
        correctIndex: q.correctOptionIndex,
      })),
    };
  }

  /**
   * Adds operational context headers to the form for grounding.
   */
  static getOperationalHeader(missionTitle: string, sector: string): string {
    return `MISSION: ${missionTitle}\nSECTOR: ${sector}\n\nIMPORTANT: Verify your understanding of the bypass route and communication protocols before departure.`;
  }
}
```
