
### services/ai-orchestrator/src/chains/news-qa.chain.ts
```typescript
/**
 * ============================================================
 * FILE: services/ai-orchestrator/src/chains/news-qa.chain.ts
 * ============================================================
 */

import { GeminiProvider } from '../providers/gemini.provider';
import { createLogger } from '@readycheck/utils';

const logger = createLogger('Chain:NewsQA');

export interface GroundingResult {
  hasConflict: boolean;
  intensity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  reasoning: string;
  recommendedAdjustment?: string;
  sourceTokensUsed?: string[]; // Citations from the telemetry feed
}

/**
 * Orchestrates the "Reality-Grounding" flow.
 * Compares planned directives against live hazard/news feeds.
 */
export class NewsQaChain {
  constructor(private readonly provider: GeminiProvider) {}

  /**
   * Grounds a specific operational intent.
   * Ensures instructions don't contradict physical reality reported in feeds.
   */
  async verifyOperationalReality(
    directive: string,
    liveContext: string
  ): Promise<GroundingResult> {
    logger.info('Performing news-based grounding check...');

    const prompt = `
      # ROLE: ReadyCheck Reality Guard
      # TASK: Verify if the DIRECTIVE conflicts with LIVE_CONTEXT.

      DIRECTIVE: "${directive}"
      LIVE_CONTEXT: "${liveContext}"

      JSON_OUTPUT_SCHEMA:
      {
        "hasConflict": boolean,
        "intensity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
        "reasoning": "string explaining why",
        "recommendedAdjustment": "string or null",
        "sourceTokensUsed": ["string keywords from live context"]
      }
    `;

    try {
      const result = await this.provider.executeJsonPrompt<GroundingResult>(prompt);
      
      // Safety Injection: If the model is too certain without evidence, 
      // we log it for audit but prefer the structured response.
      if (result.hasConflict && !result.reasoning) {
        logger.warn('Gemini flagged conflict without clear reasoning. Requesting audit.');
      }

      return result;
    } catch (error) {
      logger.error('Grounding chain failed', error);
      // Fail-safe: Assume conflict if we cannot verify against a live feed
      return {
        hasConflict: true,
        intensity: 'MEDIUM',
        reasoning: 'Reality grounding check failed systemically. Manual verification required.',
      };
    }
  }
}
```
