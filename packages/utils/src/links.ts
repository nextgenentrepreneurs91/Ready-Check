### packages/utils/src/links.ts
```typescript
/**
 * ============================================================
 * FILE: packages/utils/src/links.ts
 * ============================================================
 */

/**
 * Ensures a URL starts with https:// for external navigation.
 */
export function ensureSecureUrl(url: string | undefined): string {
  if (!url) return '';
  if (url.startsWith('http://')) return url.replace('http://', 'https://');
  if (url.startsWith('https://') || url.startsWith('/')) return url;
  return `https://${url}`;
}

/**
 * Constructs a deep link for the ReadyCheck mobile app.
 */
export function buildMobileDeepLink(path: string, params?: Record<string, string>): string {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return `readycheck://${path.replace(/^\//, '')}${query}`;
}

/**
 * Validates if a link belongs to the ReadyCheck domain.
 */
export function isInternalDomain(url: string, baseDomain: string = 'readycheck.org'): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname.endsWith(baseDomain);
  } catch {
    return url.startsWith('/');
  }
}
```
