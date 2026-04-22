
### services/api-gateway/src/auth/auth.service.ts
```typescript
/**
 * ============================================================
 * FILE: services/api-gateway/src/auth/auth.service.ts
 * ============================================================
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserRole } from '@readycheck/core-types';

@Injectable()
export class AuthService {
  /**
   * MOCK STORAGE
   * Representation of a database user record.
   */
  private readonly mockUser: User = {
    id: 'usr_91',
    email: 'marcus@ngo-riverbelt.org',
    name: 'Marcus Reynolds',
    role: 'driver',
    ngoId: 'ngo_2',
    trustIndex: 88,
    isBackgroundVerified: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date()
  };

  async signIn(email: string, password?: string): Promise<{ user: User; token: string }> {
    // Basic placeholder validation logic
    if (email !== this.mockUser.email) {
      throw new UnauthorizedException('Invalid operational credentials');
    }

    return {
      user: this.mockUser,
      token: 'mock_jwt_session_token_readycheck_a52'
    };
  }

  async getProfile(userId: string): Promise<User> {
    // In a real system, we would fetch from a database repository
    if (userId === this.mockUser.id) {
      return this.mockUser;
    }
    throw new UnauthorizedException('User session not found');
  }

  async refreshToken(token: string): Promise<{ token: string }> {
    return {
      token: 'mock_refreshed_jwt_token_b91'
    };
  }
}
```_
