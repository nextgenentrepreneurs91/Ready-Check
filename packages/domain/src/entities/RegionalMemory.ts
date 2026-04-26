### packages/domain/src/entities/RegionalMemory.ts
```typescript
/**
 * ============================================================
 * FILE: packages/domain/src/entities/RegionalMemory.ts
 * ============================================================
 */

export interface HistoricalIncident {
  id: string;
  date: Date;
  summary: string;
  outcome: 'RESOLVED' | 'STRUCTURAL_FAILURE' | 'SUCCESS_WITH_BLOCKS';
}

/**
 * Institutional "intelligence" for a specific disaster theater.
 * Used by the AI Configurator to ground new Deployment Plans in historical fact.
 */
export interface RegionalMemoryEntity {
  id: string;
  regionName: string;
  
  // Risk Profile
  topRecurringRisks: string[]; // e.g. ["Monsoon Washouts", "Communication Blackout"]
  structuralHazards: string[];
  
  // Historical Record
  priorIncidents: HistoricalIncident[];
  
  // Trust Network context
  trustedLocalPartners: string[]; // List of NGO IDs
  
  // Planning Guidance
  aiGuidanceNotes: string; // "Reality" instructions to the AI Configurator
  mandatoryVerificationKeys: string[]; // Specific topics that MUST be assessed for this region
  
  updatedAt: Date;
}

/**
 * Extract specific guidance for a given role based on regional memory.
 */
export function getRegionalGuidanceForRole(
  memory: RegionalMemoryEntity, 
  roleId: string
): string | null {
  // Logic would filter aiGuidanceNotes or specific keys for the role
  return memory.aiGuidanceNotes;
}
```
