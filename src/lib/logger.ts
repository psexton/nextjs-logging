import pino, { Logger } from "pino";

export const logger: Logger = 
    pino({ 
        // Sets minimum level to output logs for
        level: process.env.PINO_LOG_LEVEL || "debug",
        // Display log level by name instead of numeric value
        formatters: {
            level: (label) => {
              return { level: label.toUpperCase() };
            },
          },
        // Use ISO8601 timestamp instead of unix epoch, and rename from "time" to "timestamp"
        timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
    });
