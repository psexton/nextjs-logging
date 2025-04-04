import { Logger } from "pino";
import { logger as rootLogger } from "../../next-logger.config"

// This is here to adapt the pino logger created in next-logger.config.js
// into a ESM importable module.
// To use this, add code like this to your module:
// ```
// const log = logger.child({ module: "my/module/name" });
// ```

export const logger: Logger = rootLogger();
