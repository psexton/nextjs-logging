import { Logger } from "pino";
import { logger as rootLogger } from "../../next-logger.config"
import { EdgeLogger } from "./edge-logger";

// This is here to adapt the pino logger created in next-logger.config.js
// into a ESM importable module.
// To use this, add code like this to your module:
// ```
// const log = logger.child({ module: "my/module/name" });
// ```

export const logger: Logger = rootLogger();

// A factory function to create the appropriate logger based on runtime
export function createLogger(module: string) {
    // Check if we're in the Edge runtime
    if (typeof process !== 'undefined' && process.env.NEXT_RUNTIME === 'edge') {
      return new EdgeLogger(module);
    }
    
    return rootLogger().child({ module });
  }
  