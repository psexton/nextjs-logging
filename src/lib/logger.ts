export type LogMetadata = {
    [key: string]: unknown; // Allow any key with any value
  };

export function log(level: 'info' | 'warn' | 'error', message: string, metadata?: LogMetadata) {
    const logEntry: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...metadata, // Spread metadata into the log entry. Supports both flat & nested metadata.
    };
  
    // console.log(JSON.stringify(logEntry)); // Compact print for splunk/etc.
    console.log(JSON.stringify(logEntry, null, 2)); // Pretty-print logs for readability
  }
  