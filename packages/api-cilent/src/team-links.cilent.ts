### packages/api-client/src/team-links.client.ts
```typescript
/**
 * ============================================================
 * FILE: packages/api-client/src/team-links.client.ts
 * ============================================================
 */

import { AxiosInstance } from 'axios';
import { TeamInvite, UserRole } from '@readycheck/core-types';

export interface CreateInviteRequest {
  deploymentPlanId: string;
  role: UserRole;
  expiresInHours?: number;
  recipientEmail?: string; // Optional for targeted invites
  isMultiUse?: boolean; // For open call collaboration
}

export interface AcceptInviteRequest {
  token: string;
}

/**
 * Client for managing the secure onboarding and cross-NGO invitation lifecycle.
 */
export class TeamLinksClient {
  constructor(private readonly client: AxiosInstance) {}

  /**
   * Generates a new invitation link or email for a specific mission role.
   */
  async create(payload: CreateInviteRequest): Promise<TeamInvite> {
    const { data } = await this.client.post<TeamInvite>('/team-links', payload);
    return data;
  }

  async list(filters: { deploymentPlanId?: string; status?: TeamInvite['status'] }): Promise<TeamInvite[]> {
    const { data } = await this.client.get<TeamInvite[]>('/team-links', { params: filters });
    return data;
  }

  /**
   * Confirms a user's intent to join a mission.
   */
  async accept(payload: AcceptInviteRequest): Promise<{ success: boolean; teamInvite: TeamInvite }> {
    const { data } = await this.client.post('/team-links/accept', payload);
    return data;
  }

  /**
   * Instantly invalidates an invitation link.
   */
  async revoke(id: string): Promise<{ success: boolean }> {
    const { data } = await this.client.delete(`/team-links/${id}`);
    return data;
  }
}
```
