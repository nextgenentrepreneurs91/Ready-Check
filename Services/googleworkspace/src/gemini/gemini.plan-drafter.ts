### services/google-workspace/src/gemini/gemini.plan-drafter.ts
```typescript
/**
 * ============================================================
 * FILE: services/google-workspace/src/gemini/gemini.plan-drafter.ts
 * ============================================================
 */

import { GeminiWorkspaceClient } from './gemini.client';
import { createLogger } from '@readycheck/utils';

const logger = createLogger('Google:PlanDrafter');

export interface DraftedPlan {
  title: string;
  objective: string;
  suggestedRoles: string[];
  primaryHazards: string[];
  safePassageNote: string;
}

/**
 * Intelligent assistant for Mission Coordinators. 
 * Grounds high-level intent in the "Realistic" constraints of the theater.
 */
export class GeminiPlanDrafter {
  constructor(private readonly client: GeminiWorkspaceClient) {}

  /**
   * Translates a Coordinator's rough notes into a structured Deployment Plan skeleton.
   */
  async draftDeploymentPlan(
    userIntent: string, 
    regionalContext: string
  ): Promise<DraftedPlan> {
    logger.info('Drafting mission skeleton based on regional context...');

    const prompt = `
      # ROLE: ReadyCheck Tactical Planner
      # INPUT:
        - COORDINATOR_INTENT: "${userIntent}"
        - REGIONAL_SITUATION: "${regionalContext}"
        
      # TASK:
        Create a structural draft of a deployment.
        Identify the 3 most critical roles and 2 primary safety hazards.
        Ensure terminology focuses on "Verified Readiness."
        
      # FORMAT: Return JSON { title, objective, suggestedRoles[], primaryHazards[], safePassageNote }
    `;

    try {
      const rawResponse = await this.client.generateQuestionsFromDirective(prompt);
      return JSON.parse(rawResponse) as DraftedPlan;
    } catch (error) {
      logger.error('Failed to draft deployment plan', error);
      throw new Error('Intelligence Error: System was unable to synthesize the planning draft.');
    }
  }
}
```_
