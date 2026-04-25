
### services/readiness-engine/src/scoring/role-fit.ts
```typescript
/**
 * ============================================================
 * FILE: services/readiness-engine/src/scoring/role-fit.ts
 * ============================================================
 */

import { UserRole } from '@readycheck/core-types';

export interface UserCapabilities {
  primaryRole: UserRole;
  experiencedRoles: UserRole[];
  skills: string[];
  familiarRegions: string[];
}

export interface RoleRequirements {
  targetRole: UserRole;
  requiredSkills: string[];
  targetRegion: string;
}

/**
 * Calculates the specialized alignment between an operator and a mission slot.
 * High Role-Fit reduces operational friction and improves response speed.
 */
export class RoleFitEngine {
  /**
   * Returns a score between 0.0 and 1.0.
   */
  static calculate(user: UserCapabilities, role: RoleRequirements): number {
    let score = 0;

    // 1. Role Match (40% weight)
    if (user.primaryRole === role.targetRole) {
      score += 0.4;
    } else if (user.experiencedRoles.includes(role.targetRole)) {
      score += 0.25;
    }

    // 2. Skill Match (30% weight)
    const matchedSkills = role.requiredSkills.filter(s => user.skills.includes(s));
    if (role.requiredSkills.length > 0) {
      const skillRatio = matchedSkills.length / role.requiredSkills.length;
      score += (skillRatio * 0.3);
    } else {
      score += 0.3; // No skills required
    }

    // 3. Regional Familiarity (30% weight)
    // Operators who know the local road networks (e.g. Route 9 hazards) are significantly safer.
    if (user.familiarRegions.includes(role.targetRegion)) {
      score += 0.3;
    }

    return parseFloat(score.toFixed(2));
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/readiness-engine/src/scoring/role-fit.ts
```typescript
/**
 * ============================================================
 * FILE: services/readiness-engine/src/scoring/role-fit.ts
 * ============================================================
 */

import { UserRole } from '@readycheck/core-types';

export interface UserCapabilities {
  primaryRole: UserRole;
  experiencedRoles: UserRole[];
  skills: string[];
  familiarRegions: string[];
}

export interface RoleRequirements {
  targetRole: UserRole;
  requiredSkills: string[];
  targetRegion: string;
}

/**
 * Calculates the specialized alignment between an operator and a mission slot.
 * High Role-Fit reduces operational friction and improves response speed.
 */
export class RoleFitEngine {
  /**
   * Returns a score between 0.0 and 1.0.
   */
  static calculate(user: UserCapabilities, role: RoleRequirements): number {
    let score = 0;

    // 1. Role Match (40% weight)
    if (user.primaryRole === role.targetRole) {
      score += 0.4;
    } else if (user.experiencedRoles.includes(role.targetRole)) {
      score += 0.25;
    }

    // 2. Skill Match (30% weight)
    const matchedSkills = role.requiredSkills.filter(s => user.skills.includes(s));
    if (role.requiredSkills.length > 0) {
      const skillRatio = matchedSkills.length / role.requiredSkills.length;
      score += (skillRatio * 0.3);
    } else {
      score += 0.3; // No skills required
    }

    // 3. Regional Familiarity (30% weight)
    // Operators who know the local road networks (e.g. Route 9 hazards) are significantly safer.
    if (user.familiarRegions.includes(role.targetRegion)) {
      score += 0.3;
    }

    return parseFloat(score.toFixed(2));
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/readiness-engine/src/scoring/role-fit.ts
```typescript
/**
 * ============================================================
 * FILE: services/readiness-engine/src/scoring/role-fit.ts
 * ============================================================
 */

import { UserRole } from '@readycheck/core-types';

export interface UserCapabilities {
  primaryRole: UserRole;
  experiencedRoles: UserRole[];
  skills: string[];
  familiarRegions: string[];
}

export interface RoleRequirements {
  targetRole: UserRole;
  requiredSkills: string[];
  targetRegion: string;
}

/**
 * Calculates the specialized alignment between an operator and a mission slot.
 * High Role-Fit reduces operational friction and improves response speed.
 */
export class RoleFitEngine {
  /**
   * Returns a score between 0.0 and 1.0.
   */
  static calculate(user: UserCapabilities, role: RoleRequirements): number {
    let score = 0;

    // 1. Role Match (40% weight)
    if (user.primaryRole === role.targetRole) {
      score += 0.4;
    } else if (user.experiencedRoles.includes(role.targetRole)) {
      score += 0.25;
    }

    // 2. Skill Match (30% weight)
    const matchedSkills = role.requiredSkills.filter(s => user.skills.includes(s));
    if (role.requiredSkills.length > 0) {
      const skillRatio = matchedSkills.length / role.requiredSkills.length;
      score += (skillRatio * 0.3);
    } else {
      score += 0.3; // No skills required
    }

    // 3. Regional Familiarity (30% weight)
    // Operators who know the local road networks (e.g. Route 9 hazards) are significantly safer.
    if (user.familiarRegions.includes(role.targetRegion)) {
      score += 0.3;
    }

    return parseFloat(score.toFixed(2));
  }
}
```
