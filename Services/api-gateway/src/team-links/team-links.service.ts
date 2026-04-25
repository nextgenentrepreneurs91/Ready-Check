### services/api-gateway/src/team-links/team-links.service.ts
```typescript
/**
 * ============================================================
 * FILE: services/api-gateway/src/team-links/team-links.service.ts
 * ============================================================
 */

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { TeamInviteEntity, TeamInviteStatus } from '@readycheck/domain';

@Injectable()
export class TeamLinksService {
  /**
   * MOCK STORAGE
   * Volatile collection of time-bound team invitations.
   */
  private mockInvites: TeamInviteEntity[] = [
    {
      id: 'inv_1',
      inviterUserId: 'usr_coordinator_1',
      inviterNgoId: 'ngo_1',
      inviteeEmail: 'volunteer@civ-network.org',
      targetDeploymentPlanId: 'dep_8092',
      targetRole: 'volunteer',
      inviteToken: 'secure_hash_v1_001',
      status: 'PENDING',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 86400000), // 24 hours
    }
  ];

  async listAll(): Promise<TeamInviteEntity[]> {
    return this.mockInvites;
  }

  async create(data: Partial<TeamInviteEntity>): Promise<TeamInviteEntity> {
    const invite: TeamInviteEntity = {
      ...data,
      id: `inv_${Math.floor(Math.random() * 1000)}`,
      inviteToken: Math.random().toString(36).substring(2, 15),
      status: 'PENDING',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 172800000), // 48 hours
    } as TeamInviteEntity;

    this.mockInvites.push(invite);
    return invite;
  }

  async accept(token: string, userId: string): Promise<TeamInviteEntity> {
    const invite = this.mockInvites.find(i => i.inviteToken === token);
    if (!invite) throw new NotFoundException('Invitation link invalid or expired');
    if (invite.status !== 'PENDING') throw new ConflictException('Invitation already processed');

    invite.status = 'ACCEPTED';
    invite.acceptedAt = new Date();
    invite.acceptedByUserId = userId;
    
    return invite;
  }

  async revoke(id: string): Promise<void> {
    const invite = this.mockInvites.find(i => i.id === id);
    if (!invite) throw new NotFoundException('Invitation not found');
    invite.status = 'REVOKED';
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/api-gateway/src/team-links/team-links.service.ts
```typescript
/**
 * ============================================================
 * FILE: services/api-gateway/src/team-links/team-links.service.ts
 * ============================================================
 */

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { TeamInviteEntity } from '@readycheck/domain';

@Injectable()
export class TeamLinksService {
  /**
   * MOCK STORAGE
   * Volatile collection of time-bound team invitations.
   */
  private mockInvites: TeamInviteEntity[] = [
    {
      id: 'inv_1',
      inviterUserId: 'usr_coordinator_1',
      inviterNgoId: 'ngo_1',
      inviteeEmail: 'volunteer@civ-network.org',
      targetDeploymentPlanId: 'dep_8092',
      targetRole: 'volunteer',
      inviteToken: 'secure_hash_v1_001',
      status: 'PENDING',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 86400000), // 24 hours
    }
  ];

  async listAll(): Promise<TeamInviteEntity[]> {
    return this.mockInvites;
  }

  async create(data: Partial<TeamInviteEntity>): Promise<TeamInviteEntity> {
    const invite: TeamInviteEntity = {
      ...data,
      id: `inv_${Math.floor(Math.random() * 1000)}`,
      inviteToken: Math.random().toString(36).substring(2, 15),
      status: 'PENDING',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 172800000), // 48 hours
    } as TeamInviteEntity;

    this.mockInvites.push(invite);
    return invite;
  }

  async accept(token: string, userId: string): Promise<TeamInviteEntity> {
    const invite = this.mockInvites.find(i => i.inviteToken === token);
    if (!invite) throw new NotFoundException('Invitation link invalid or expired');
    if (invite.status !== 'PENDING') throw new ConflictException('Invitation already processed');

    invite.status = 'ACCEPTED';
    invite.acceptedAt = new Date();
    invite.acceptedByUserId = userId;
    
    return invite;
  }

  async revoke(id: string): Promise<void> {
    const invite = this.mockInvites.find(i => i.id === id);
    if (!invite) throw new NotFoundException('Invitation not found');
    invite.status = 'REVOKED';
  }
}
```
