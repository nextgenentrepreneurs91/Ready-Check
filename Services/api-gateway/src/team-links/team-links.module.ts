### services/api-gateway/src/team-links/team-links.module.ts
```typescript
/**
 * ============================================================
 * FILE: services/api-gateway/src/team-links/team-links.module.ts
 * ============================================================
 */

import { Module } from '@nestjs/common';
import { TeamLinksController } from './team-links.controller';
import { TeamLinksService } from './team-links.service';

@Module({
  controllers: [TeamLinksController],
  providers: [TeamLinksService],
  exports: [TeamLinksService],
})
export class TeamLinksModule {}
```
