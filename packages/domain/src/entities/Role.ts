### packages/domain/src/entities/Role.ts
```typescript
/**
 * ============================================================
 * FILE: packages/domain/src/entities/Role.ts
 * ============================================================
 */

import { UserRole } from '@readycheck/core-types';

/**
 * Defines the operational impact and expectations of a specific role 
 * within the disaster response theater.
 */
export type ReadinessCriticality = 'LOW' | 'MEDIUM' | 'HIGH' | 'MISSION_CRITICAL';

export interface RoleDefinition {
  id: UserRole;
  label: string;
  description: string;
  criticality: ReadinessCriticality;
  responsibilityAreas: string[];
  requiresBackgroundCheck: boolean;
}

/**
 * Registry of all operational roles recognized by the ReadyCheck ecosystem.
 */
export const ROLE_DEFINITIONS: Record<UserRole, RoleDefinition> = {
  volunteer: {
    id: 'volunteer',
    label: 'Field Volunteer',
    description: 'General support person for non-specialized tasks.',
    criticality: 'LOW',
    responsibilityAreas: ['Manual Labor', 'Distribution Support', 'Civilian Guidance'],
    requiresBackgroundCheck: true
  },
  driver: {
    id: 'driver',
    label: 'Convoy Driver',
    description: 'Personnel responsible for vehicle operation and routing.',
    criticality: 'MISSION_CRITICAL',
    responsibilityAreas: ['Transport', 'Routing Compliance', 'Vehicle Maintenance'],
    requiresBackgroundCheck: true
  },
  medic: {
    id: 'medic',
    label: 'Mobile Medic',
    description: 'Certified medical personnel for field triage and treatment.',
    criticality: 'MISSION_CRITICAL',
    responsibilityAreas: ['Triage', 'Level-1 Trauma Support', 'Medical Logistics'],
    requiresBackgroundCheck: true
  },
  coordinator: {
    id: 'coordinator',
    label: 'Operations Coordinator',
    description: 'Primary planner and personnel dispatcher for an NGO.',
    criticality: 'HIGH',
    responsibilityAreas: ['Planning', 'Dispatch', 'Real-time Verification Monitoring'],
    requiresBackgroundCheck: true
  },
  executive: {
    id: 'executive',
    label: 'NGO Executive',
    description: 'Strategic leadership focused on multi-mission portfolio health.',
    criticality: 'MEDIUM',
    responsibilityAreas: ['Strategic Oversight', 'Partner Trust Management'],
    requiresBackgroundCheck: true
  },
  government_viewer: {
    id: 'government_viewer',
    label: 'Government Stakeholder',
    description: 'State or regional authority with high-level oversight.',
    criticality: 'LOW',
    responsibilityAreas: ['Resource Gap Identification', 'Policy Oversight'],
    requiresBackgroundCheck: true
  },
  admin: {
    id: 'admin',
    label: 'System Administrator',
    description: 'Infrastructure and platform configuration lead.',
    criticality: 'MEDIUM',
    responsibilityAreas: ['User Management', 'System Health', 'Audit Trail Maintenance'],
    requiresBackgroundCheck: true
  }
};
```
