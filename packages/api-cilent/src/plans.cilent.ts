### packages/api-client/src/plans.client.ts
```typescript
/**
 * ============================================================
 * FILE: packages/api-client/src/plans.client.ts
 * ============================================================
 */

import { AxiosInstance } from 'axios';
import { 
  DeploymentPlan, 
  DeploymentStatus,
  GeoPolygon
} from '@readycheck/core-types';

export interface CreatePlanRequest {
  title: string;
  objective: string;
  regionName: string;
  boundary?: GeoPolygon;
  rawInstructions?: string; // For AI Configurator ingestion: PDFs or text
  bypassAi?: boolean;
}

export interface UpdatePlanRequest extends Partial<CreatePlanRequest> {
  status?: DeploymentStatus;
  verificationThreshold?: number;
}

/**
 * Client for the planning phase: creating, drafting, and refining operational intents.
 */
export class PlansClient {
  constructor(private readonly client: AxiosInstance) {}

  /**
   * Submits a new master plan. Triggers the AI Configurator by default to
   * generate Action Cards and Assessment questions.
   */
  async createDraft(payload: CreatePlanRequest): Promise<DeploymentPlan> {
    const { data } = await this.client.post<DeploymentPlan>('/plans', payload);
    return data;
  }

  async list(ngoId?: string): Promise<DeploymentPlan[]> {
    const { data } = await this.client.get<DeploymentPlan[]>('/plans', {
      params: { ngoId }
    });
    return data;
  }

  async getById(id: string): Promise<DeploymentPlan> {
    const { data } = await this.client.get<DeploymentPlan>(`/plans/${id}`);
    return data;
  }

  async update(id: string, payload: UpdatePlanRequest): Promise<DeploymentPlan> {
    const { data } = await this.client.patch<DeploymentPlan>(`/plans/${id}`, payload);
    return data;
  }

  /**
   * Transitions a DRAFT plan to PENDING_VERIFICATION.
   * This pushes the Action Cards to the mobile devices of assigned personnel.
   */
  async requestReadinessVerification(id: string): Promise<{ success: boolean; dispatchedAt: Date }> {
    const { data } = await this.client.post(`/plans/${id}/verify-request`);
    return data;
  }
}
```
