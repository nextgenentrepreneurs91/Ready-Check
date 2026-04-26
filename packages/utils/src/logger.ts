### packages/utils/src/logger.ts
```typescript
/**
 * ============================================================
 * FILE: packages/utils/src/logger.ts
 * ============================================================
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_WEIGHTS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

/**
 * Lightweight, scoped logger with structured metadata support.
 * Designed to work consistently across Web, Mobile, and Node.
 */
export class Logger {
  private readonly scope: string;
  private readonly minLevel: LogLevel;

  constructor(scope: string, minLevel: LogLevel = 'info') {
    this.scope = scope;
    this.minLevel = minLevel;
  }

  private shouldLog(level: LogLevel): boolean {
    return LEVEL_WEIGHTS[level] >= LEVEL_WEIGHTS[this.minLevel];
  }

  private format(level: LogLevel, message: string): string {
    return `[${this.scope}] ${level.toUpperCase()}: ${message}`;
  }

  info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.info(this.format('info', message), ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(this.format('warn', message), ...args);
    }
  }

  error(message: string, error?: Error | unknown, ...args: any[]): void {
    if (this.shouldLog('error')) {
      console.error(this.format('error', message), error, ...args);
    }
  }

  debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.debug(this.format('debug', message), ...args);
    }
  }
}

/**
 * Factory function to create a new scoped logger.
 */
export const createLogger = (scope: string, level?: LogLevel) => new Logger(scope, level);

// Global default instance for generic use
export const logger = createLogger('System');
```
