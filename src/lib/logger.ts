// export type LogMetadata = {
//     [key: string]: unknown; // Allow any key with any value
//   };

// export function log(level: 'info' | 'warn' | 'error', message: string, metadata?: LogMetadata) {
//     const logEntry: Record<string, unknown> = {
//       timestamp: new Date().toISOString(),
//       level,
//       message,
//       runtime: process.env.NEXT_RUNTIME,
//       ...metadata, // Spread metadata into the log entry. Supports both flat & nested metadata.
//     };
  
//     if (process.env.NODE_ENV == 'development')
//         console.log(JSON.stringify(logEntry, null, 2)); // Pretty-print logs for readability
//     else
//         console.log(JSON.stringify(logEntry)); // Compact print for splunk/etc.
//   }
  
import pino, { Logger, LoggerOptions } from "pino";
import { format } from 'date-fns';

const COLOR = {
  CYAN: '\x1b[36m',
  WHITE: '\x1b[37m',
};

const getLevelColor = (level: string): string => {
  // Example function, customize as needed
  switch (level) {
    case 'ERROR': return '\x1b[31m'; // Red
    case 'WARN': return '\x1b[33m'; // Yellow
    case 'INFO': return '\x1b[32m'; // Green
    case 'DEBUG': return '\x1b[34m'; // Blue
    default: return '\x1b[37m'; // White
  }
};

const serverNodeRuntimeConfig = {
  transport: {
    target: `pino-pretty`,
    options: {
      colorize: true,
      messageFormat: `[{group}] {msg}`,
      hideObject: true,
      ignore: `pid,hostname`,
    },
  },
}

const defaultConfig = {
  browser: {
    write: (logObj: unknown) => {
      const { level, msg, group, time, icon } = logObj as Record<string, string>

      const levelUppercased = level.toUpperCase()
      const timeFormatted = format(new Date(time), `HH:mm:ss.sss`)
      const levelColor = getLevelColor(levelUppercased)

      // Output the formatted message using console.log
      console.log(
        `[${timeFormatted}] ${levelColor}${levelUppercased} ${COLOR.CYAN}[${icon} ${group}] ${msg} ${COLOR.WHITE}`
      )
    },
    formatters: {
      level: (label: string) => {
        return {
          level: label,
        }
      },
    },
  },
}

const baseConfig: LoggerOptions = {};

export const logger: Logger = pino({
  ...baseConfig,
  ...(process.env.IS_RUNTIME_NODE ? serverNodeRuntimeConfig : defaultConfig),
  // Disable logging on the client unless in development
  enabled: process.env.IS_SERVER || process.env.IS_DEVELOPMENT,
})
