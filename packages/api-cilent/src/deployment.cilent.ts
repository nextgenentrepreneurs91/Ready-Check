### packages/api-client/src/deployments.client.ts
```typescript
/**
 * ============================================================
 * FILE: packages/api-client/src/deployments.client.ts
 * ============================================================
 */

import { AxiosInstance } from 'axios';
import { 
  DeploymentPlan, 
  DeploymentStatus, 
  VerificationStatus 
} from '@readycheck/core-types';

export interface ReadinessSummary {
  deploymentId: string;
  totalPersonnel: number;
  verifiedCount: number;
  blockedCount: number;
  readinessRate: number; // Percent 0-1
  isThresholdMet: boolean;
  blockedRoles: string[];
}

/**
 * Client for managing deployment planning and live execution status.
 */
export class DeploymentsClient {
  constructor(private readonly client: AxiosInstance) {}

  async list(filters?: { status?: DeploymentStatus }): Promise<DeploymentPlan[]> {
    const { data } = await this.client.get<DeploymentPlan[]>('/deployments', { params: filters });
    return data;
  }

  async getById(id: string): Promise<DeploymentPlan> {
    const { data } = await this.client.get<DeploymentPlan>(`/deployments/${id}`);
    return data;
  }

  async updateStatus(id: string, status: DeploymentStatus): Promise<DeploymentPlan> {
    const { data } = await this.client.patch<DeploymentPlan>(`/deployments/${id}/status`, { status });
    return data;
  }

  /**
   * Returns high-level metrics on whether the deployment is gated or cleared to launch.
   */
  async getReadinessSummary(id: string): Promise<ReadinessSummary> {
    const { data } = await this.client.get<ReadinessSummary>(`/deployments/${id}/readiness`);
    return data;
  }

  /**
   * Final command to transition a plan from PENDING_VERIFICATION to ACTIVE.
   */
  async triggerDispatch(id: string): Promise<{ success: boolean; activeAt: Date }> {
    const { data } = await this.client.post(`/deployments/${id}/dispatch`);
    return data;
  }
}
```
