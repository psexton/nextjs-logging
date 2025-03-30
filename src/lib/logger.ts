export function log(level: 'info' | 'warn' | 'error', message: string, metadata?: Record<string, unknown>) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...metadata, // Spread metadata into the log entry
    };
  
    console.log(JSON.stringify(logEntry));
  }
  