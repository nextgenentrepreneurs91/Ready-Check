### services/trust-engine/src/scoring/ngo-trust-score.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/scoring/ngo-trust-score.ts
 * ============================================================
 */

import { clampScore } from '@readycheck/utils';

export interface NgoTrustFactors {
  partnershipScore: number;      // 0-100 (from CrossNgoFeedbackEngine)
  historicalReliability: number; // 0-100 (from DeploymentHistoryWeightEngine)
  averageEventRating: number;    // 0-100 (from EventRatingScorer)
  regionalReadinessRate: number; // 0.0-1.0 (Success of their local teams)
}

export type TrustStatus = 'VETTING_REQUIRED' | 'PROBATIONARY' | 'TRUSTED_PARTNER' | 'STRATEGIC_CORE';

export interface NgoTrustSignal {
  score: number;
  status: TrustStatus;
  breakdown: {
    historyWeight: number;
    partnershipWeight: number;
    performanceWeight: number;
  };
}

/**
 * Aggregates all organizational trust signals into a single "Partnership Credibility" index.
 */
export class NgoTrustScoreEngine {
  /**
   * Synthesizes the overall trust signal for an NGO.
   */
  static synthesize(factors: NgoTrustFactors): NgoTrustSignal {
    // 1. Weighted Calculation
    // We prioritize historical reliability (40%) and event performance (40%). 
    // New partners rely on peer partnership signals (20%).
    const historyComp = factors.historicalReliability * 0.4;
    const performanceComp = factors.averageEventRating * 0.4;
    const partnershipComp = factors.partnershipScore * 0.2;

    let baseScore = historyComp + performanceComp + partnershipComp;

    // 2. Regional Readiness Boost
    // NGOs with a proven track record in their specific region get a small bonus.
    if (factors.regionalReadinessRate > 0.9) baseScore += 5;

    const finalScore = clampScore(baseScore);

    // 3. Status Mapping
    let status: TrustStatus = 'VETTING_REQUIRED';
    if (finalScore >= 90) status = 'STRATEGIC_CORE';
    else if (finalScore >= 75) status = 'TRUSTED_PARTNER';
    else if (finalScore >= 50) status = 'PROBATIONARY';

    return {
      score: finalScore,
      status,
      breakdown: {
        historyWeight: Math.round(historyComp),
        partnershipWeight: Math.round(partnershipComp),
        performanceWeight: Math.round(performanceComp),
      }
    };
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/trust-engine/src/scoring/ngo-trust-score.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/scoring/ngo-trust-score.ts
 * ============================================================
 */

import { clampScore } from '@readycheck/utils';

export interface NgoTrustFactors {
  partnershipScore: number;      // 0-100 (from CrossNgoFeedbackEngine)
  historicalReliability: number; // 0-100 (from DeploymentHistoryWeightEngine)
  averageEventRating: number;    // 0-100 (from EventRatingScorer)
  regionalReadinessRate: number; // 0.0-1.0 (Success of their local teams)
}

export type TrustStatus = 'VETTING_REQUIRED' | 'PROBATIONARY' | 'TRUSTED_PARTNER' | 'STRATEGIC_CORE';

export interface NgoTrustSignal {
  score: number;
  status: TrustStatus;
  breakdown: {
    historyWeight: number;
    partnershipWeight: number;
    performanceWeight: number;
  };
}

/**
 * Aggregates all organizational trust signals into a single "Partnership Credibility" index.
 */
export class NgoTrustScoreEngine {
  /**
   * Synthesizes the overall trust signal for an NGO.
   */
  static synthesize(factors: NgoTrustFactors): NgoTrustSignal {
    // 1. Weighted Calculation
    // We prioritize historical reliability (40%) and event performance (40%). 
    // New partners rely on peer partnership signals (20%).
    const historyComp = factors.historicalReliability * 0.4;
    const performanceComp = factors.averageEventRating * 0.4;
    const partnershipComp = factors.partnershipScore * 0.2;

    let baseScore = historyComp + performanceComp + partnershipComp;

    // 2. Regional Readiness Boost
    // NGOs with a proven track record in their specific region get a small bonus.
    if (factors.regionalReadinessRate > 0.9) baseScore += 5;

    const finalScore = clampScore(baseScore);

    // 3. Status Mapping
    let status: TrustStatus = 'VETTING_REQUIRED';
    if (finalScore >= 90) status = 'STRATEGIC_CORE';
    else if (finalScore >= 75) status = 'TRUSTED_PARTNER';
    else if (finalScore >= 50) status = 'PROBATIONARY';

    return {
      score: finalScore,
      status,
      breakdown: {
        historyWeight: Math.round(historyComp),
        partnershipWeight: Math.round(partnershipComp),
        performanceWeight: Math.round(performanceComp),
      }
    };
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/trust-engine/src/scoring/ngo-trust-score.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/scoring/ngo-trust-score.ts
 * ============================================================
 */

import { clampScore } from '@readycheck/utils';

export interface NgoTrustFactors {
  partnershipScore: number;      // 0-100 (from CrossNgoFeedbackEngine)
  historicalReliability: number; // 0-100 (from DeploymentHistoryWeightEngine)
  averageEventRating: number;    // 0-100 (from EventRatingScorer)
  regionalReadinessRate: number; // 0.0-1.0 (Success of their local teams)
}

export type TrustStatus = 'VETTING_REQUIRED' | 'PROBATIONARY' | 'TRUSTED_PARTNER' | 'STRATEGIC_CORE';

export interface NgoTrustSignal {
  score: number;
  status: TrustStatus;
  breakdown: {
    historyWeight: number;
    partnershipWeight: number;
    performanceWeight: number;
  };
}

/**
 * Aggregates all organizational trust signals into a single "Partnership Credibility" index.
 */
export class NgoTrustScoreEngine {
  /**
   * Synthesizes the overall trust signal for an NGO.
   */
  static synthesize(factors: NgoTrustFactors): NgoTrustSignal {
    // 1. Weighted Calculation
    // We prioritize historical reliability (40%) and event performance (40%). 
    // New partners rely on peer partnership signals (20%).
    const historyComp = factors.historicalReliability * 0.4;
    const performanceComp = factors.averageEventRating * 0.4;
    const partnershipComp = factors.partnershipScore * 0.2;

    let baseScore = historyComp + performanceComp + partnershipComp;

    // 2. Regional Readiness Boost
    // NGOs with a proven track record in their specific region get a small bonus.
    if (factors.regionalReadinessRate > 0.9) baseScore += 5;

    const finalScore = clampScore(baseScore);

    // 3. Status Mapping
    let status: TrustStatus = 'VETTING_REQUIRED';
    if (finalScore >= 90) status = 'STRATEGIC_CORE';
    else if (finalScore >= 75) status = 'TRUSTED_PARTNER';
    else if (finalScore >= 50) status = 'PROBATIONARY';

    return {
      score: finalScore,
      status,
      breakdown: {
        historyWeight: Math.round(historyComp),
        partnershipWeight: Math.round(partnershipComp),
        performanceWeight: Math.round(performanceComp),
      }
    };
  }
}
```
