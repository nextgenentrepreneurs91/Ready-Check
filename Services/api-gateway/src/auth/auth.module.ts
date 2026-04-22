### services/api-gateway/src/auth/auth.module.ts
```typescript
/**
 * ============================================================
 * FILE: services/api-gateway/src/auth/auth.module.ts
 * ============================================================
 */

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService], // Exported for use in guards across the gateway
})
export class AuthModule {}
```
