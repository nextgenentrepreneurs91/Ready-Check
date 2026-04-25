### services/api-gateway/src/deployments/deployments.controller.ts
```typescript
/**
 * ============================================================
 * FILE: services/api-gateway/src/deployments/deployments.controller.ts
 * ============================================================
 */

import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DeploymentsService } from './deployments.service';
import { DeploymentStatus } from '@readycheck/core-types';
import { IsEnum } from 'class-validator';

class UpdateStatusDto {
  @IsEnum(['DRAFT', 'PENDING_VERIFICATION', 'ACTIVE', 'COMPLETED', 'ARCHIVED'])
  status: DeploymentStatus;
}

@ApiTags('Deployment Operations')
@Controller('deployments')
export class DeploymentsController {
  constructor(private readonly deploymentsService: DeploymentsService) {}

  @Get()
  @ApiOperation({ summary: 'List all operational deployments for the NGO' })
  async findAll() {
    return this.deploymentsService.listAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details for a specific deployment' })
  async findOne(@Param('id') id: string) {
    return this.deploymentsService.getById(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update deployment status (Subject to Readiness Gating)' })
  async updateStatus(@Param('id') id: string, @Body() body: UpdateStatusDto) {
    return this.deploymentsService.updateStatus(id, body.status);
  }
}
```
