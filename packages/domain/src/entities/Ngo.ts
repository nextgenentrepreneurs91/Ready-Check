### packages/domain/src/entities/Ngo.ts
```typescript
/**
 * ============================================================
 * FILE: packages/domain/src/entities/Ngo.ts
 * ============================================================
 */

export type PartnershipType = 'CORE_GOVERNMENTAL' | 'NGO_INTERNATIONAL' | 'NGO_LOCAL' | 'PRIVATE_SECTOR';

/**
 * Represents a sovereign organization within the ReadyCheck network.
 */
export interface NgoEntity {
  id: string;
  name: string;
  headquarters: string;
  
  // Organizational Profile
  type: PartnershipType;
  capabilities: string[]; // e.g., ["Search & Rescue", "Medical", "Logistics", "Water"]
  
  // Footprint
  regionsServed: string[];
  
  // Trust Engine State
  trustIndex: number; // 0-100 derived from mission success rates
  verifiedBadge: boolean; // Manual administrative verification
  
  // Connectivity
  activeIntegrationLinks: string[]; // IDs of external system adapters (Google Drive, etc.)
  
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Validates if an NGO has the specific capability required by a Deployment Plan role.
 */
export function ngoHasCapability(ngo: NgoEntity, requiredCapability: string): boolean {
  return ngo.capabilities.includes(requiredCapability);
}
```
