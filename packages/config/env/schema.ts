### packages/config/env/schema.ts
```typescript
/**
 * ============================================================
 * FILE: packages/config/env/schema.ts
 * ============================================================
 */

import { z } from 'zod';

/**
 * Unified Environment Schema for ReadyCheck.
 * Ensures that critical operational variables are present at runtime 
 * across both server-side (API) and client-side (Web/Mobile) contexts.
 */
export const envSchema = z.object({
  // --- Node Core ---
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

  // --- Network Endpoints ---
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_WEB_URL: z.string().url(),

  // --- AI Configurator (Gemini / Vertex AI) ---
  GEMINI_API_KEY: z.string().optional(),
  AI_PROVIDER_MODEL: z.string().default('gemini-1.5-pro'),
  AI_REALITY_CHECK_ENABLED: z.boolean().default(true),

  // --- Mapping & Location Services ---
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string(),

  // --- Authentication ---
  AUTH_SECRET: z.string().min(16),
  AUTH_SESSION_TTL: z.string().default('24h'),

  // --- Redis (Sync Queues) ---
  REDIS_URL: z.string().url().optional(),

  // --- Google Integration Stubs ---
  GOOGLE_SERVICE_ACCOUNT_JSON: z.string().optional(),
  GOOGLE_DRIVE_FOLDER_ID: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Helper to validate the environment and provide clear error mapping.
 */
export function validateEnv(config: Record<string, unknown>): Env {
  const result = envSchema.safeParse(config);

  if (!result.success) {
    const errorMap = result.error.flatten().fieldErrors;
    console.error('❌ Invalid environment variables:', JSON.stringify(errorMap, null, 2));
    throw new Error('Environment validation failed');
  }

  return result.data;
}
```
