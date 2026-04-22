
### services/api-gateway/src/app.module.ts
```typescript
/**
 * ============================================================
 * FILE: services/api-gateway/src/app.module.ts
 * ============================================================
 */

import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

// --- Sub-Modules ---
import { AuthModule } from './auth/auth.module';
import { AssessmentsModule } from './assessments/assessments.module';
import { DeploymentsModule } from './deployments/deployments.module';
import { PlansModule } from './plans/plans.module';
import { RatingsModule } from './ratings/ratings.module';
import { TeamLinksModule } from './team-links/team-links.module';

@Module({
  imports: [
    AuthModule,
    AssessmentsModule,
    DeploymentsModule,
    PlansModule,
    RatingsModule,
    TeamLinksModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
```
