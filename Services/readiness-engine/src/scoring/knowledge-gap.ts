### services/readiness-engine/src/scoring/knowledge-gap.ts
```typescript
/**
 * ============================================================
 * FILE: services/readiness-engine/src/scoring/knowledge-gap.ts
 * ============================================================
 */

export interface IncorrectSignal {
  topic: string;
  isSafetyCritical: boolean;
  userRationale?: string; // Captured if the assessment supports open-field justification
}

export interface GapDiagnosis {
  topic: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  priority: number; // 0-100
  remediationAction: string;
}

/**
 * Diagnostic engine for the ReadyCheck Correction-Loop.
 * Instead of simple failure, it detects WHICH parts of the "Action Card" 
 * the operator failed to ground in their understanding.
 */
export class KnowledgeGapEngine {
  /**
   * Analyzes a set of incorrect results to produce actionable remediation paths.
   */
  static diagnose(signals: IncorrectSignal[]): GapDiagnosis[] {
    const gaps = new Map<string, GapDiagnosis>();

    signals.forEach((sig) => {
      const existing = gaps.get(sig.topic);
      
      const severity = sig.isSafetyCritical ? 'CRITICAL' : 'MEDIUM';
      const priorityBoost = sig.isSafetyCritical ? 40 : 10;

      if (!existing) {
        gaps.set(sig.topic, {
          topic: sig.topic,
          severity,
          priority: priorityBoost,
          remediationAction: `Re-verify ${sig.topic} protocols in the mission briefing.`
        });
      } else {
        existing.priority = Math.min(existing.priority + priorityBoost, 100);
        if (sig.isSafetyCritical) existing.severity = 'CRITICAL';
      }
    });

    return Array.from(gaps.values()).sort((a, b) => b.priority - a.priority);
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/readiness-engine/src/scoring/knowledge-gap.ts
```typescript
/**
 * ============================================================
 * FILE: services/readiness-engine/src/scoring/knowledge-gap.ts
 * ============================================================
 */

export interface IncorrectSignal {
  topic: string;
  isSafetyCritical: boolean;
  userRationale?: string; // Captured if the assessment supports open-field justification
}

export interface GapDiagnosis {
  topic: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  priority: number; // 0-100
  remediationAction: string;
}

/**
 * Diagnostic engine for the ReadyCheck Correction-Loop.
 * Instead of simple failure, it detects WHICH parts of the "Action Card" 
 * the operator failed to ground in their understanding.
 */
export class KnowledgeGapEngine {
  /**
   * Analyzes a set of incorrect results to produce actionable remediation paths.
   */
  static diagnose(signals: IncorrectSignal[]): GapDiagnosis[] {
    const gaps = new Map<string, GapDiagnosis>();

    signals.forEach((sig) => {
      const existing = gaps.get(sig.topic);
      
      const severity = sig.isSafetyCritical ? 'CRITICAL' : 'MEDIUM';
      const priorityBoost = sig.isSafetyCritical ? 40 : 10;

      if (!existing) {
        gaps.set(sig.topic, {
          topic: sig.topic,
          severity,
          priority: priorityBoost,
          remediationAction: `Re-verify ${sig.topic} protocols in the mission briefing.`
        });
      } else {
        existing.priority = Math.min(existing.priority + priorityBoost, 100);
        if (sig.isSafetyCritical) existing.severity = 'CRITICAL';
      }
    });

    return Array.from(gaps.values()).sort((a, b) => b.priority - a.priority);
  }
}
```
