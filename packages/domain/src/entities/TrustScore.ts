### packages/domain/src/entities/TrustScore.ts
```typescript
/**
 * ============================================================
 * FILE: packages/domain/src/entities/TrustScore.ts
 * ============================================================
 */

export type TrustSubjectType = 'USER' | 'NGO' | 'TEAM';

export interface TrustSignalBreakdown {
  reliability: number; // 0-100
  instructionClarity: number; // 0-100 (mainly for coordinators/NGOs)
  teamwork: number; // 0-100
  missionSuccessRate: number; // 0-100
}

/**
 * The mathematical soul of the ReadyCheck platform.
 * Represents the rolling verifiable reliability of a person or agency.
 */
export interface TrustScoreEntity {
  id: string;
  
  // Mapping
  subjectId: string;
  subjectType: TrustSubjectType;
  
  // Aggregate data
  overallScore: number; // 0-100
  breakdown: TrustSignalBreakdown;
  
  // Context
  totalMissionsEvaluated: number;
  lastRecalculatedAt: Date;
  
  // AI-generated reasoning
  explanatoryNotes: string; // e.g. "Score increased due to 5 consecutive first-try verification passes."
  
  // Persistence metadata
  historicalScores: { date: Date; score: number }[];
}

/**
 * Categorizes a trust score into actionable operational brackets.
 */
export function getTrustBracket(score: number): 'ELITE' | 'RELIABLE' | 'PROVISIONAL' | 'RESTRICTED' {
  if (score >= 90) return 'ELITE';
  if (score >= 75) return 'RELIABLE';
  if (score >= 50) return 'PROVISIONAL';
  return 'RESTRICTED';
}
```
