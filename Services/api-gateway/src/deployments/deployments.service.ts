### services/api-gateway/src/deployments/deployments.service.ts
```typescript
/**
 * ============================================================
 * FILE: services/api-gateway/src/deployments/deployments.service.ts
 * ============================================================
 */

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { DeploymentPlan, DeploymentStatus } from '@readycheck/core-types';

@Injectable()
export class DeploymentsService {
  /**
   * MOCK STORAGE
   * Operational deployment records for the current NGO context.
   */
  private readonly mockDeployments: DeploymentPlan[] = [
    {
      id: 'dep_8092',
      ngoId: 'ngo_1',
      title: 'Assam Flood: Emergency Food Distribution',
      objective: 'Deliver 50,000 rations while bypassing Route 9 washout.',
      status: 'PENDING_VERIFICATION',
      regionName: 'North River Belt',
      readinessRate: 0.65, // Below the 90% threshold
      isGated: true
    }
  ];

  async listAll(): Promise<DeploymentPlan[]> {
    return this.mockDeployments;
  }

  async getById(id: string): Promise<DeploymentPlan> {
    const deployment = this.mockDeployments.find(d => d.id === id);
    if (!deployment) throw new NotFoundException('Deployment not found');
    return deployment;
  }

  async updateStatus(id: string, newStatus: DeploymentStatus): Promise<DeploymentPlan> {
    const deployment = await this.getById(id);

    // READINESS GATE LOGIC
    // Displacement 'ACTIVE' state requires high readiness and no critical role blocks.
    if (newStatus === 'ACTIVE' && (deployment.readinessRate < 0.9 || deployment.isGated)) {
      throw new ForbiddenException(
        `Readiness Gate Error: Cannot transition to ACTIVE. Readiness is ${Math.round(deployment.readinessRate * 100)}% and critical roles remain blocked.`
      );
    }

    deployment.status = newStatus;
    return deployment;
  }
}
```
