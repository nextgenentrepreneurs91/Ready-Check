### services/google-workspace/src/index.ts
```typescript
/**
 * ============================================================
 * FILE: services/google-workspace/src/index.ts
 * ============================================================
 */

// --- Forms Integration ---
export * from './forms/forms.client';
export * from './forms/assessment-form.builder';
export * from './forms/response-sync';

// --- Gemini / Intelligence Integration ---
export * from './gemini/gemini.client';
export * from './gemini/gemini.plan-drafter';

// --- Maps / Spatial Integration ---
export * from './maps/maps.client';
export * from './maps/geo-fence';
export * from './maps/place-enrichment';
export * from './maps/route-intelligence';
```
