### services/api-gateway/src/deployments/deployments.module.ts
```typescript
/**
 * ============================================================
 * FILE: services/api-gateway/src/deployments/deployments.module.ts
 * ============================================================
 */

import { Module } from '@nestjs/common';
import { DeploymentsController } from './deployments.controller';
import { DeploymentsService } from './deployments.service';

@Module({
  controllers: [DeploymentsController],
  providers: [DeploymentsService],
  exports: [DeploymentsService],
})
export class DeploymentsModule {}
```
