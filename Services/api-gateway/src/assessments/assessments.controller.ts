### services/api-gateway/src/assessments/assessments.controller.ts
```typescript
/**
 * ============================================================
 * FILE: services/api-gateway/src/assessments/assessments.controller.ts
 * ============================================================
 */

import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AssessmentsService } from './assessments.service';
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AnswerDto {
  @IsString()
  questionId: string;
  
  @IsString()
  selectedOptionIndex: number;
}

class VerifyAssessmentDto {
  @IsString()
  assessmentId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}

@ApiTags('Readiness Verification')
@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Get('pending')
  @ApiOperation({ summary: 'List assessments requiring operator clarification' })
  async listPending() {
    const mockUserId = 'usr_91';
    return this.assessmentsService.listPending(mockUserId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a specific assessment and its action-based questions' })
  async getById(@Param('id') id: string) {
    return this.assessmentsService.getById(id);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Submit answers for operational verification' })
  async verifySubmission(@Body() body: VerifyAssessmentDto) {
    const mockUserId = 'usr_91';
    return this.assessmentsService.submitAnswers(mockUserId, body.assessmentId, body.answers);
  }

  @Get('task/:taskId/decision')
  @ApiOperation({ summary: 'Retrieve the qualification status for a specific task' })
  async getDecision(@Param('taskId') taskId: string) {
    const mockUserId = 'usr_91';
    return this.assessmentsService.getDecision(taskId, mockUserId);
  }
}
```
