### services/google-workspace/src/maps/geo-fence.ts
```typescript
/**
 * ============================================================
 * FILE: services/google-workspace/src/maps/geo-fence.ts
 * ============================================================
 */

import { LatLng } from '@readycheck/utils';

/**
 * Lightweight spatial utility for mission perimeter enforcement.
 */
export class GeoFenceService {
  /**
   * Haversine formula for calculating distance between two points on a sphere.
   * Used to check if a team is within their assigned staging radius.
   */
  static isPointWithinRadius(
    center: LatLng, 
    point: LatLng, 
    radiusKm: number
  ): boolean {
    const R = 6371; // Earth's radius in km
    const dLat = (point.lat - center.lat) * (Math.PI / 180);
    const dLng = (point.lng - center.lng) * (Math.PI / 180);

    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(center.lat * (Math.PI / 180)) * Math.cos(point.lat * (Math.PI / 180)) * 
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance <= radiusKm;
  }

  /**
   * Ray-casting algorithm for point-in-polygon verification.
   * Used to verify if a deployment plan's coverage includes a specific hazard point.
   */
  static isPointInPolygon(point: LatLng, polygon: LatLng[]): boolean {
    let isInside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].lat, yi = polygon[i].lng;
      const xj = polygon[j].lat, yj = polygon[j].lng;

      const intersect = ((yi > point.lng) !== (yj > point.lng)) &&
        (point.lat < (xj - xi) * (point.lng - yi) / (yj - yi) + xi);
      
      if (intersect) isInside = !isInside;
    }
    return isInside;
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/google-workspace/src/maps/geo-fence.ts
```typescript
/**
 * ============================================================
 * FILE: services/google-workspace/src/maps/geo-fence.ts
 * ============================================================
 */

import { LatLng } from '@readycheck/utils';

/**
 * Lightweight spatial utility for mission perimeter enforcement.
 */
export class GeoFenceService {
  /**
   * Haversine formula for calculating distance between two points on a sphere.
   * Used to check if a team is within their assigned staging radius.
   */
  static isPointWithinRadius(
    center: LatLng, 
    point: LatLng, 
    radiusKm: number
  ): boolean {
    const R = 6371; // Earth's radius in km
    const dLat = (point.lat - center.lat) * (Math.PI / 180);
    const dLng = (point.lng - center.lng) * (Math.PI / 180);

    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(center.lat * (Math.PI / 180)) * Math.cos(point.lat * (Math.PI / 180)) * 
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance <= radiusKm;
  }

  /**
   * Ray-casting algorithm for point-in-polygon verification.
   * Used to verify if a deployment plan's coverage includes a specific hazard point.
   */
  static isPointInPolygon(point: LatLng, polygon: LatLng[]): boolean {
    let isInside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].lat, yi = polygon[i].lng;
      const xj = polygon[j].lat, yj = polygon[j].lng;

      const intersect = ((yi > point.lng) !== (yj > point.lng)) &&
        (point.lat < (xj - xi) * (point.lng - yi) / (yj - yi) + xi);
      
      if (intersect) isInside = !isInside;
    }
    return isInside;
  }
}
```
