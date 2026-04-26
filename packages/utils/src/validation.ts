### packages/utils/src/validation.ts
```typescript
/**
 * ============================================================
 * FILE: packages/utils/src/validation.ts
 * ============================================================
 */

/**
 * Validates a basic email structure.
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Checks if a string matches the ReadyCheck internal ID format (e.g., usr_123, dep_456).
 */
export function isValidReadyCheckId(id: string, prefix?: string): boolean {
  if (!id) return false;
  if (prefix) return id.startsWith(`${prefix}_`);
  return /^[a-z]{2,4}_[a-zA-Z0-9]+$/.test(id);
}

/**
 * Ensures a number is within a specific operational threshold.
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Validates that a required string is not just whitespace.
 */
export function hasContent(value: string | undefined | null): boolean {
  if (!value) return false;
  return value.trim().length > 0;
}
```
