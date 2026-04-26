### packages/domain/src/entities/GeoCoverage.ts
```typescript
/**
 * ============================================================
 * FILE: packages/domain/src/entities/GeoCoverage.ts
 * ============================================================
 */

import { GeoPolygon } from '@readycheck/core-types';

/**
 * Defines a spatial region of responsibility or operation.
 * Used to ground DeploymentPlans and anchor NGO footprints.
 */
export interface GeoCoverageEntity {
  id: string;
  
  // Ownership context (NGO, User-preferred, or Mission-specific)
  ownerId: string;
  ownerType: 'NGO' | 'USER' | 'MISSION';
  
  // Spatial Data
  regionName: string;
  boundary: GeoPolygon;
  
  // Operational Metadata
  primaryHazards: string[]; // e.g. ["Flooding", "Seismic"]
  readinessBaseline: number; // Regional capability score (0-100)
  
  // Telemetry Context
  lastTelemetrySyncAt?: Date;
  isInsideActiveDisasterZone: boolean;
}

/**
 * Utility to check if a set of coordinates falls within the coverage.
 * (Placeholder for actual spatial library integration like turf.js)
 */
export function isCoordinateWithinCoverage(
  lat: number, 
  lng: number, 
  coverage: GeoCoverageEntity
): boolean {
  // In a real implementation, we would use a spatial library to check 
  // point-in-polygon relative to coverage.boundary
  console.info(`Checking coordinate [${lat}, ${lng}] against ${coverage.regionName}`);
  return true; 
}
```
