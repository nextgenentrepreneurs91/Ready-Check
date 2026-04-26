### packages/utils/src/date.ts
```typescript
/**
 * ============================================================
 * FILE: packages/utils/src/date.ts
 * ============================================================
 */

import { format, formatDistanceToNow, parseISO } from 'date-fns';

/**
 * Formats a date for operational displays (e.g., 14:00 Local).
 */
export function formatOperationalTime(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'HH:mm');
}

/**
 * Returns a human-friendly relative time string (e.g., "5m ago").
 */
export function timeAgo(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true })
    .replace('about ', '')
    .replace('less than a minute ago', 'just now');
}

/**
 * Standardizes a date into the system's preferred ISO format.
 */
export function toSystemIso(date: Date): string {
  return date.toISOString();
}

/**
 * Formats a full date for report headers.
 */
export function formatReportDate(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'MMM dd, yyyy HH:mm');
}
```
