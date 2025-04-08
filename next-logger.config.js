const pino = require('pino');
const { trace, context } = require('@opentelemetry/api');

const nodePinoConfig = {
    formatters: {
        // Display log level by name instead of numeric value
        level: (label) => {
            return { level: label.toUpperCase() };
        },
        // Omit the hostname & pid fields that pino includes by default,
        // and include the runtime instead
        bindings: () => {
            return {
                runtime: process.env.NEXT_RUNTIME,
            };
        },
    },
    // Sets minimum level to output logs for
    level: process.env.PINO_LOG_LEVEL || "debug",
    // Use ISO8601 timestamp instead of unix epoch
    timestamp: pino.stdTimeFunctions.isoTime,
    mixin: () => {
        const activeSpan = trace.getSpan(context.active());
        const traceId = activeSpan?.spanContext().traceId ?? "unknown";
        const spanId = activeSpan?.spanContext().spanId ?? "unknown";
        return { traceId, spanId, }
    },
}

// Pino doesn't seem to work great with NextJS's edge runtime,
// so this is a crude workaround that mostly sorta works.
// BUG: Any extra params passed to the log message are dropped.
// See: <https://github.com/vercel/next.js/discussions/33898>
const edgePinoConfig = {
    browser: {
        asObject: true,
        formatters: {
            // Display log level by name instead of numeric value
            level: (label) => {
                return { level: label.toUpperCase() };
            },
        },
        write: (logEntry) => { 
            // Take in the log obj and recast it to a Record so we can add fields to it,
            // replicating what we do with bindings in the nodeRuntimeConfig
            const activeSpan = trace.getSpan(context.active());
            const traceId = activeSpan?.spanContext().traceId ?? "unknown";
            const spanId = activeSpan?.spanContext().spanId ?? "unknown";

            logEntry.runtime = process.env.NEXT_RUNTIME ?? "unknown"
            logEntry.traceId = traceId
            logEntry.spanId = spanId
            
            // Don't stringify the object - just pass it directly to console.log
            // Next.js will handle the serialization properly
            console.log(logEntry) 
        },
    },
}

// Pino instance used by NextJS, via next-logging
const logger = (defaultConfig) =>
    pino({
        ...defaultConfig,
        ...(process.env.NEXT_RUNTIME === 'edge' ? edgePinoConfig : nodePinoConfig),
    })

module.exports = {
    logger,
}
