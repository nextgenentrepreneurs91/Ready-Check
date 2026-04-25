### services/trust-engine/src/index.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/index.ts
 * ============================================================
 */

export * from './scorers/feedback-analyzer';
export * from './scorers/ngo-reputation.scorer';
export * from './scorers/operator-trust.scorer';
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### services/trust-engine/src/index.ts
```typescript
/**
 * ============================================================
 * FILE: services/trust-engine/src/index.ts
 * ============================================================
 */

export * from './scoring/feedback-analyzer';
export * from './scoring/ngo-reputation';
export * from './scoring/operator-trust';
```
