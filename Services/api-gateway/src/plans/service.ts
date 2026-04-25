### services/api-gateway/src/plans/plans.service.ts
```typescript
/**
 * ============================================================
 * FILE: services/api-gateway/src/plans/plans.service.ts
 * ============================================================
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { DeploymentPlan } from '@readycheck/core-types';

@Injectable()
export class PlansService {
  /**
   * MOCK STORAGE
   * Strategic intent and tactical role configurations for new missions.
   */
  private mockPlans: DeploymentPlan[] = [
    {
      id: 'dep_8092',
      ngoId: 'ngo_1',
      title: 'Assam Flood: Emergency Food Distribution',
      objective: 'Provide daily rations to Sector 7 while Route 9 is impassable.',
      status: 'PENDING_VERIFICATION',
      regionName: 'North River Belt',
      readinessRate: 0.65,
      isGated: true
    }
  ];

  async findAll(): Promise<DeploymentPlan[]> {
    return this.mockPlans;
  }

  async findById(id: string): Promise<DeploymentPlan> {
    const plan = this.mockPlans.find(p => p.id === id);
    if (!plan) throw new NotFoundException('Mission plan not found');
    return plan;
  }

  async create(data: Partial<DeploymentPlan>): Promise<DeploymentPlan> {
    const newPlan = {
      ...data,
      id: `dep_${Math.floor(Math.random() * 10000)}`,
      status: 'DRAFT',
      readinessRate: 0,
      isGated: false,
      createdAt: new Date(),
    } as DeploymentPlan;

    this.mockPlans.push(newPlan);
    return newPlan;
  }

  async update(id: string, data: Partial<DeploymentPlan>): Promise<DeploymentPlan> {
    const index = this.mockPlans.findIndex(p => p.id === id);
    if (index === -1) throw new NotFoundException('Mission plan not found');

    this.mockPlans[index] = { ...this.mockPlans[index], ...data };
    return this.mockPlans[index];
  }
}
```_
