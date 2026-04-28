### services/api-gateway/src/ratings/ratings.controller.ts
```typescript
/**
 * ============================================================
 * FILE: services/api-gateway/src/ratings/ratings.controller.ts
 * ============================================================
 */

import { Controller, Get, Post, Body, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RatingsService } from './ratings.service';
import { IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

class SubmitRatingDto {
  @IsString()
  @IsNotEmpty()
  targetId: string;

  @IsString()
  @IsNotEmpty()
  deploymentPlanId: string;

  @IsObject()
  dimensions: {
    preparedness: number;
    clarity: number;
    teamwork: number;
    followThrough: number;
  };

  @IsString()
  @IsOptional()
  comments?: string;
}

@ApiTags('Trust & Performance')
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get()
  @ApiOperation({ summary: 'List all verifiable feedback records for a subject' })
  async findAll(@Query('targetId') targetId: string) {
    return this.ratingsService.findAllByTarget(targetId);
  }

  @Post()
  @ApiOperation({ summary: 'Submit a role-based performance rating after mission completion' })
  async submit(@Body() body: SubmitRatingDto) {
    const mockUserId = 'usr_coordinator_1';
    return this.ratingsService.submit(mockUserId, body);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Get aggregate trust signal for a user or NGO' })
  async getSummary(@Query('targetId') targetId: string) {
    return this.ratingsService.getTrustSummary(targetId);
  }
}
```
