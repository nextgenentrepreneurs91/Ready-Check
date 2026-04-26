### packages/api-client/src/auth.client.ts
```typescript
/**
 * ============================================================
 * FILE: packages/api-client/src/auth.client.ts
 * ============================================================
 */

import { AxiosInstance } from 'axios';
import { User } from '@readycheck/core-types';

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface SignInCredentials {
  email: string;
  password?: string;
  otp?: string; // Supporting operational MFA if required
}

/**
 * Handles all authentication and session-related API interactions.
 */
export class AuthClient {
  constructor(private readonly client: AxiosInstance) {}

  async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
    const { data } = await this.client.post<AuthResponse>('/auth/signin', credentials);
    return data;
  }

  async signOut(): Promise<void> {
    await this.client.post('/auth/signout');
  }

  async getSession(): Promise<User> {
    const { data } = await this.client.get<User>('/auth/me');
    return data;
  }

  async refreshToken(token: string): Promise<{ token: string }> {
    const { data } = await this.client.post<{ token: string }>('/auth/refresh', {
      refreshToken: token,
    });
    return data;
  }
}
```
