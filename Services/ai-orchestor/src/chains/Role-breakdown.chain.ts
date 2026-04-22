### services/ai-orchestrator/src/chains/role-breakdown.chain.ts
```typescript
/**
 * ============================================================
 * FILE: services/ai-orchestrator/src/chains/role-breakdown.chain.ts
 * ============================================================
 */

import { GeminiProvider } from '../providers/gemini.provider';
import { createLogger } from '@readycheck/utils';
import { UserRole } from '@readycheck/core-types';

const logger = createLogger('Chain:RoleBreakdown');

export interface RoleActionCard {
  role: UserRole;
  title: string;
  summary: string;
  steps: string[];
  equipment: string[];
  hazards: string[];
  reportTo: string;
}

/**
 * Orchestrates the "Operational Distillation" phase. 
 * Splits a massive master plan into concise, role-centric instructions.
 */
export class RoleBreakdownChain {
  constructor(private readonly provider: GeminiProvider) {}

  /**
   * Generates a unique Action Card for each role involved in the deployment.
   */
  async generateActionCards(
    masterPlan: string,
    rolesToDefine: UserRole[]
  ): Promise<RoleActionCard[]> {
    logger.info(`Breaking down plan for ${rolesToDefine.length} roles...`);

    const prompt = `
      # ROLE: ReadyCheck Tactical Planner
      # TASK: Sub-divide the MASTER_PLAN into specific Action Cards for each role.

      MASTER_PLAN: "${masterPlan}"
      TARGET_ROLES: ${rolesToDefine.join(', ')}

      GOAL:
      For each role, provide ONLY the information they need to execute. 
      Avoid info-overload by removing irrelevant cross-role details.

      JSON_OUTPUT_SCHEMA:
      [
        {
          "role": "one of the target roles",
          "title": "Role-specific title",
          "summary": "one sentence intent",
          "steps": ["ordered list of field actions"],
          "equipment": ["necessary gear"],
          "hazards": ["specific risks for this role"],
          "reportTo": "string"
        }
      ]
    `;

    try {
      const cards = await this.provider.executeJsonPrompt<RoleActionCard[]>(prompt);
      
      logger.info(`Successfully generated ${cards.length} Action Cards.`);
      return cards;
    } catch (error) {
      logger.error('Failed to generate role action cards', error);
      throw new Error('AI Orchestration failure: Could not decompose plan into role cards.');
    }
  }
}
```
