export function log(level: 'info' | 'warn' | 'error', message: string, metadata?: Record<string, unknown>) {
    console[level](`[${level.toUpperCase()}] ${message}`, metadata || '');
  }
  