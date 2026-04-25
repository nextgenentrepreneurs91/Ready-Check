### services/api-gateway/src/team-links/team-links.controller.ts
```typescript
/**
 * ============================================================
 * FILE: services/api-gateway/src/team-links/team-links.controller.ts
 * ============================================================
 */

import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TeamLinksService } from './team-links.service';
import { UserRole } from '@readycheck/core-types';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class CreateInviteDto {
  @IsEmail()
  inviteeEmail: string;

  @IsString()
  @IsNotEmpty()
  targetDeploymentPlanId: string;

  @IsString()
  @IsNotEmpty()
  targetRole: UserRole;
}

@ApiTags('Team Management')
@Controller('team-links')
export class TeamLinksController {
  constructor(private readonly teamLinksService: TeamLinksService) {}

  @Get()
  @ApiOperation({ summary: 'List all active and pending invitations' })
  async findAll() {
    return this.teamLinksService.listAll();
  }

  @Post('invite')
  @ApiOperation({ summary: 'Create a secure team invitation link' })
  async create(@Body() body: CreateInviteDto) {
    const mockInviterId = 'usr_coordinator_1';
    const mockNgoId = 'ngo_1';
    return this.teamLinksService.create({
      ...body,
      inviterUserId: mockInviterId,
      inviterNgoId: mockNgoId
    });
  }

  @Post('accept/:token')
  @ApiOperation({ summary: 'Accept an invitation and link to an operator profile' })
  async accept(@Param('token') token: string) {
    const mockUserId = 'usr_new_99'; 
    return this.teamLinksService.accept(token, mockUserId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Revoke or expire an invitation' })
  async revoke(@Param('id') id: string) {
    return this.teamLinksService.revoke(id);
  }
}
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/api-gateway/src/team-links/team-links.controller.ts
```typescript
/**
 * ============================================================
 * FILE: services/api-gateway/src/team-links/team-links.controller.ts
 * ============================================================
 */

import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TeamLinksService } from './team-links.service';
import { UserRole } from '@readycheck/core-types';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class CreateInviteDto {
  @IsEmail()
  inviteeEmail: string;

  @IsString()
  @IsNotEmpty()
  targetDeploymentPlanId: string;

  @IsString()
  @IsNotEmpty()
  targetRole: UserRole;
}

@ApiTags('Team Management')
@Controller('team-links')
export class TeamLinksController {
  constructor(private readonly teamLinksService: TeamLinksService) {}

  @Get()
  @ApiOperation({ summary: 'List all active and pending invitations' })
  async findAll() {
    return this.teamLinksService.listAll();
  }

  @Post('invite')
  @ApiOperation({ summary: 'Create a secure team invitation link' })
  async create(@Body() body: CreateInviteDto) {
    const mockInviterId = 'usr_coordinator_1';
    const mockNgoId = 'ngo_1';
    return this.teamLinksService.create({
      ...body,
      inviterUserId: mockInviterId,
      inviterNgoId: mockNgoId
    });
  }

  @Post('accept/:token')
  @ApiOperation({ summary: 'Accept an invitation and link to an operator profile' })
  async accept(@Param('token') token: string) {
    const mockUserId = 'usr_new_99'; 
    return this.teamLinksService.accept(token, mockUserId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Revoke or expire an invitation' })
  async revoke(@Param('id') id: string) {
    return this.teamLinksService.revoke(id);
  }
}
```
