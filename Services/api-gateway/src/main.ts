
### services/api-gateway/src/main.ts
```typescript
/**
 * ============================================================
 * FILE: services/api-gateway/src/main.ts
 * ============================================================
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { createLogger } from '@readycheck/utils';

const logger = createLogger('API:Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- Security & Middleware ---
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // --- Validation ---
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // --- OpenAPI / Swagger Documentation ---
  const config = new DocumentBuilder()
    .setTitle('ReadyCheck API Gateway')
    .setDescription('Operational readiness and deployment management engine.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // --- Port Configuration ---
  const port = process.env.PORT || 4000;
  await app.listen(port);
  
  logger.info(`ReadyCheck API Gateway is running on: http://localhost:${port}`);
  logger.info(`Swagger documentation available at: http://localhost:${port}/docs`);
}

bootstrap().catch((err) => {
  logger.error('Failed to bootstrap ReadyCheck API Gateway', err);
  process.exit(1);
});
```
