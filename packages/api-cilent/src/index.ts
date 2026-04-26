### packages/api-client/src/index.ts
```typescript
/**
 * ============================================================
 * FILE: packages/api-client/src/index.ts
 * ============================================================
 */

import axios, { AxiosInstance } from 'axios';
import { AuthClient } from './auth.client';
import { AssessmentsClient } from './assessments.client';
import { DeploymentsClient } from './deployments.client';
import { PlansClient } from './plans.client';
import { RatingsClient } from './ratings.client';
import { TeamLinksClient } from './team-links.client';

export * from './auth.client';
export * from './assessments.client';
export * from './deployments.client';
export * from './plans.client';
export * from './ratings.client';
export * from './team-links.client';

export interface ReadyCheckConfig {
  baseURL: string;
  token?: string;
  timeout?: number;
}

/**
 * The primary unified entry-point for the ReadyCheck API ecosystem.
 * Aggregates all domain-specific clients into a single instance.
 */
export class ReadyCheckClient {
  private readonly client: AxiosInstance;

  public readonly auth: AuthClient;
  public readonly assessments: AssessmentsClient;
  public readonly deployments: DeploymentsClient;
  public readonly plans: PlansClient;
  public readonly ratings: RatingsClient;
  public readonly teamLinks: TeamLinksClient;

  constructor(config: ReadyCheckConfig) {
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout ?? 10000,
      headers: {
        'Content-Type': 'application/json',
        ...(config.token ? { Authorization: `Bearer ${config.token}` } : {}),
      },
    });

    // Initialize sub-clients with shared axial instance
    this.auth = new AuthClient(this.client);
    this.assessments = new AssessmentsClient(this.client);
    this.deployments = new DeploymentsClient(this.client);
    this.plans = new PlansClient(this.client);
    this.ratings = new RatingsClient(this.client);
    this.teamLinks = new TeamLinksClient(this.client);
  }

  /**
   * Utility to update the authorization header dynamically 
   * (e.g. after a sign-in or token refresh).
   */
  public setToken(token: string): void {
    this.client.defaults.headers.Authorization = `Bearer ${token}`;
  }

  /**
   * Utility to clear headers on sign-out.
   */
  public clearToken(): void {
    delete this.client.defaults.headers.Authorization;
  }
}
```
