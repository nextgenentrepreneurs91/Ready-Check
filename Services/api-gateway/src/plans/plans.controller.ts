### services/api-gateway/src/plans/plans.controller.ts
```typescript
/**
 * ============================================================
 * FILE: services/api-gateway/src/plans/plans.controller.ts
 * ============================================================
 */

import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PlansService } from './plans.service';
import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  objective: string;

  @IsString()
  @IsNotEmpty()
  regionName: string;
  
  @IsArray()
  @IsOptional()
  criticalRoles?: string[];
}

class UpdatePlanDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  objective?: string;

  @IsArray()
  @IsOptional()
  criticalRoles?: string[];
}

@ApiTags('Planning & Intelligence')
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  @ApiOperation({ summary: 'List all deployment plans (drafts and pending)' })
  async findAll() {
    return this.plansService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get strategic details for a specific plan' })
  async findOne(@Param('id') id: string) {
    return this.plansService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Initialize a new deployment intent (Draft)' })
  async create(@Body() body: CreatePlanDto) {
    return this.plansService.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modify operational parameters or role requirements' })
  async update(@Param('id') id: string, @Body() body: UpdatePlanDto) {
    return this.plansService.update(id, body);
  }
}
```
