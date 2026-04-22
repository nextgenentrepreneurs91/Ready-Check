### services/ai-orchestrator/src/chains/plan-draft.chain.ts
```typescript
/**
 * ============================================================
 * FILE: services/ai-orchestrator/src/chains/plan-draft.chain.ts
 * ============================================================
 */

import { GeminiProvider } from '../providers/gemini.provider';
import { createLogger } from '@readycheck/utils';

const logger = createLogger('Chain:PlanDraft');

export interface PlanDraftInput {
  objective: string;
  region: string;
  teamSize?: number;
  knownRisks?: string[];
  resourceInventory?: string;
  routeConcerns?: string;
}

export interface PlanDraftOutput {
  title: string;
  strategicObjective: string;
  suggestedRoles: { role: string; count: number; primaryTask: string }[];
  riskAssessment: { hazard: string; mitigation: string }[];
  operationalDirectives: string[];
  safetyProtocol: string;
}

/**
 * Orchestrates the conversion of sparse coordinator intent 
 * into a structured, editable Deployment Plan draft.
 */
export class PlanDraftChain {
  constructor(private readonly provider: GeminiProvider) {}

  /**
   * Generates a structural skeleton for a new deployment.
   * Note: The AI acts as an assistant; the output is always marked as 'DRAFT' 
   * for human review and modification.
   */
  async generateDraft(input: PlanDraftInput): Promise<PlanDraftOutput> {
    logger.info(`Drafting plan for region: ${input.region}`);

    const prompt = `
      # ROLE: ReadyCheck Senior Planner
      # TASK: Generate a structured deployment plan draft.

      OBJECTIVE: "${input.objective}"
      REGION: "${input.region}"
      KNOWN_RISKS: ${input.knownRisks?.join(', ') || 'None specified'}
      RESOURCES: ${input.resourceInventory || 'Standard loadout'}
      ROUTE_CONCERNS: ${input.routeConcerns || 'Manual routing assigned'}

      INSTRUCTIONS:
      Distill these inputs into a logical operational framework. 
      Ensure role assignments match the target team size of ${input.teamSize || 'optimal scale'}.

      RETURN JSON SCHEMA:
      {
        "title": "Short descriptive mission name",
        "strategicObjective": "summarized intent",
        "suggestedRoles": [{ "role": "string", "count": number, "primaryTask": "string" }],
        "riskAssessment": [{ "hazard": "string", "mitigation": "string" }],
        "operationalDirectives": ["string"],
        "safetyProtocol": "string"
      }
    `;

    try {
      const draft = await this.provider.executeJsonPrompt<PlanDraftOutput>(prompt);
      
      logger.info(`Successfully generated draft: ${draft.title}`);
      return draft;
    } catch (error) {
      logger.error('Failed to generate plan draft', error);
      throw new Error('AI Orchestration failure: Could not synthesize plan draft.');
    }
  }
}
```
