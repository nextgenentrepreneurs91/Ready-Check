### services/ai-orchestrator/src/index.ts
```typescript
/**
 * ============================================================
 * FILE: services/ai-orchestrator/src/index.ts
 * ============================================================
 */

import { GeminiProvider, GeminiConfig } from './providers/gemini.provider';
import { PlanDraftChain } from './chains/plan-draft.chain';
import { ReadinessCheckChain } from './chains/readiness-check.chain';
import { RoleBreakdownChain } from './chains/role-breakdown.chain';
import { NewsQaChain } from './chains/news-qa.chain';

export * from './providers/gemini.provider';
export * from './chains/plan-draft.chain';
export * from './chains/readiness-check.chain';
export * from './chains/role-breakdown.chain';
export * from './chains/news-qa.chain';

/**
 * Unified Intelligence Facade for the ReadyCheck platform.
 * Provides a single access point for all AI-assisted operational workflows.
 */
export class ReadyCheckAiOrchestrator {
  private readonly provider: GeminiProvider;

  public readonly planning: PlanDraftChain;
  public readonly verification: ReadinessCheckChain;
  public readonly breakdown: RoleBreakdownChain;
  public readonly grounding: NewsQaChain;

  constructor(config: GeminiConfig) {
    this.provider = new GeminiProvider(config);

    // Initialize intent-specific chains
    this.planning = new PlanDraftChain(this.provider);
    this.verification = new ReadinessCheckChain(this.provider);
    this.breakdown = new RoleBreakdownChain(this.provider);
    this.grounding = new NewsQaChain(this.provider);
  }
}
```
