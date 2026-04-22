
### services/api-gateway/src/health.controller.ts
```typescript
/**
 * ============================================================
 * FILE: services/api-gateway/src/health.controller.ts
 * ============================================================
 */

import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Infrastructure')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'System health check' })
  check() {
    return {
      status: 'AVAILABLE',
      service: 'readycheck-api-gateway',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0'
    };
  }
}
```
