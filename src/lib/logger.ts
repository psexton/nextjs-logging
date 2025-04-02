import pino, { Logger } from "pino";

export const logger: Logger =
    pino({
        formatters: {
            // Display log level by name instead of numeric value
            level: (label) => {
                return { level: label.toUpperCase() };
            },
            // Omit the hostname & pid fields that pino includes by default,
            // and include the runtime instead
            bindings: (bindings) => {
                return {
                    runtime: process.env.NEXT_RUNTIME,
                };
            },
        },
        // Sets minimum level to output logs for
        level: process.env.PINO_LOG_LEVEL || "debug",
        // Use ISO8601 timestamp instead of unix epoch, and rename from "time" to "timestamp"
        timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,

    });
