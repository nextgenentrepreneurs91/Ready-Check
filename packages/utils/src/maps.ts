### packages/utils/src/maps.ts
```typescript
/**
 * ============================================================
 * FILE: packages/utils/src/maps.ts
 * ============================================================
 */

export interface LatLng {
  lat: number;
  lng: number;
}

/**
 * Normalizes coordinate strings or objects into a standard LatLng object.
 */
export function normalizeCoord(input: [number, number] | LatLng | string): LatLng {
  if (Array.isArray(input)) return { lat: input[0], lng: input[1] };
  if (typeof input === 'string') {
    const [lat, lng] = input.split(',').map(Number);
    return { lat, lng };
  }
  return input;
}

/**
 * Strips technical noise from hazard descriptions for clear field display.
 */
export function formatHazardLabel(raw: string): string {
  return raw
    .replace('HAZARD_', '')
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

/**
 * Formats a distance in kilometers for operational summaries.
 */
export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)}m`;
  return `${km.toFixed(1)}km`;
}

/**
 * Calculates a crude bounding box for a set of coordinates.
 */
export function getBoundingBox(coords: LatLng[]): { min: LatLng; max: LatLng } | null {
  if (coords.length === 0) return null;
  
  return coords.reduce(
    (acc, cur) => ({
      min: { lat: Math.min(acc.min.lat, cur.lat), lng: Math.min(acc.min.lng, cur.lng) },
      max: { lat: Math.max(acc.max.lat, cur.lat), lng: Math.max(acc.max.lng, cur.lng) },
    }),
    { min: coords[0], max: coords[0] }
  );
}
```
