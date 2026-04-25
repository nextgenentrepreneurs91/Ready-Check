### services/google-workspace/src/maps/place-enrichment.ts
```typescript
/**
 * ============================================================
 * FILE: services/google-workspace/src/maps/place-enrichment.ts
 * ============================================================
 */

import { LatLng } from '@readycheck/utils';

export interface EnrichedLocation {
  id: string;
  name: string;
  coordinate: LatLng;
  address: string;
  
  // Operational Context
  siteType: 'STAGING_AREA' | 'HOSPITAL' | 'DISTRIBUTION_POINT' | 'HAZARD_ZONE';
  accessNotes: string; // e.g. "Gate 4 restricted to heavy vehicles"
  lastVerifiedAt: Date;
  
  // Readiness Context
  isFunctional: boolean;
  activeHazards: string[];
}

/**
 * Higher-order utility for decorating raw spatial data with 
 * ReadyCheck disaster-response intelligence.
 */
export class PlaceEnrichmentService {
  /**
   * Transforms a generic map coordinate into a mission-critical asset definition.
   */
  static enrich(
    rawPlace: any, 
    type: EnrichedLocation['siteType'],
    notes: string = ''
  ): EnrichedLocation {
    return {
      id: rawPlace.place_id || `loc_${Math.random()}`,
      name: rawPlace.name || 'Unnamed Point of Interest',
      coordinate: {
        lat: rawPlace.geometry?.location?.lat || 0,
        lng: rawPlace.geometry?.location?.lng || 0,
      },
      address: rawPlace.formatted_address || '',
      siteType: type,
      accessNotes: notes,
      lastVerifiedAt: new Date(),
      isFunctional: true, // Default to functional until telemetry flags otherwise
      activeHazards: [],
    };
  }

  /**
   * Flags a location as compromised based on ground feedback alerts.
   */
  static markAsCompromised(
    location: EnrichedLocation, 
    reason: string
  ): EnrichedLocation {
    return {
      ...location,
      isFunctional: false,
      activeHazards: [...location.activeHazards, reason],
      lastVerifiedAt: new Date()
    };
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/google-workspace/src/maps/place-enrichment.ts
```typescript
/**
 * ============================================================
 * FILE: services/google-workspace/src/maps/place-enrichment.ts
 * ============================================================
 */

import { LatLng } from '@readycheck/utils';

export interface EnrichedLocation {
  id: string;
  name: string;
  coordinate: LatLng;
  address: string;
  
  // Operational Context
  siteType: 'STAGING_AREA' | 'HOSPITAL' | 'DISTRIBUTION_POINT' | 'HAZARD_ZONE';
  accessNotes: string; // e.g. "Gate 4 restricted to heavy vehicles"
  lastVerifiedAt: Date;
  
  // Readiness Context
  isFunctional: boolean;
  activeHazards: string[];
}

/**
 * Higher-order utility for decorating raw spatial data with 
 * ReadyCheck disaster-response intelligence.
 */
export class PlaceEnrichmentService {
  /**
   * Transforms a generic map coordinate into a mission-critical asset definition.
   */
  static enrich(
    rawPlace: any, 
    type: EnrichedLocation['siteType'],
    notes: string = ''
  ): EnrichedLocation {
    return {
      id: rawPlace.place_id || `loc_${Math.random()}`,
      name: rawPlace.name || 'Unnamed Point of Interest',
      coordinate: {
        lat: rawPlace.geometry?.location?.lat || 0,
        lng: rawPlace.geometry?.location?.lng || 0,
      },
      address: rawPlace.formatted_address || '',
      siteType: type,
      accessNotes: notes,
      lastVerifiedAt: new Date(),
      isFunctional: true, // Default to functional until telemetry flags otherwise
      activeHazards: [],
    };
  }

  /**
   * Flags a location as compromised based on ground feedback alerts.
   */
  static markAsCompromised(
    location: EnrichedLocation, 
    reason: string
  ): EnrichedLocation {
    return {
      ...location,
      isFunctional: false,
      activeHazards: [...location.activeHazards, reason],
      lastVerifiedAt: new Date()
    };
  }
}
```
