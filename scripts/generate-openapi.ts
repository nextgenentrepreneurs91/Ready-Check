### scripts/generate-openapi.ts
```typescript
/**
 * ============================================================
 * FILE: scripts/generate-openapi.ts
 * ============================================================
 */

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../backend/api/src/app.module'; // Adjust path based on monorepo structure
import * as fs from 'fs';
import * as path from 'path';

/**
 * Bootstraps a headless version of the API to extract the 
 * OpenAPI/Swagger specification for the client generator.
 */
async function generate() {
  console.log('--- Generating ReadyCheck OpenAPI Specification ---');

  const app = await NestFactory.create(AppModule, { logger: false });

  const config = new DocumentBuilder()
    .setTitle('ReadyCheck API')
    .setDescription('Disaster-response readiness verification and deployment gateway.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const outputPath = path.resolve(__dirname, '../docs/openapi-spec.json');

  fs.writeFileSync(outputPath, JSON.stringify(document, null, 2), 'utf8');

  console.log(`✓ OpenAPI spec written to: ${outputPath}`);
  
  await app.close();
}

generate().catch((err) => {
  console.error('❌ Failed to generate OpenAPI spec:', err);
  process.exit(1);
});
```
