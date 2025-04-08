import { trace, context } from '@opentelemetry/api';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export class EdgeLogger {
  private module: string;
  
  constructor(module: string) {
    this.module = module;
  }
  
  private log(level: LogLevel, msg: string, data?: Record<string, any>) {
    const activeSpan = trace.getSpan(context.active());
    const traceId = activeSpan?.spanContext().traceId ?? "unknown";
    const spanId = activeSpan?.spanContext().spanId ?? "unknown";
    
    const logEntry = {
      time: new Date().toISOString(),
      level: level.toUpperCase(),
      module: this.module,
      msg,
      runtime: 'edge',
      traceId,
      spanId,
      ...data
    };
    
    // Output directly through console based on level
    switch (level) {
      case 'debug':
        console.debug(logEntry);
        break;
      case 'info':
        console.info(logEntry);
        break;
      case 'warn':
        console.warn(logEntry);
        break;
      case 'error':
        console.error(logEntry);
        break;
    }
  }
  
  debug(msg: string, data?: Record<string, any>) {
    this.log('debug', msg, data);
  }
  
  info(msg: string, data?: Record<string, any>) {
    this.log('info', msg, data);
  }
  
  warn(msg: string, data?: Record<string, any>) {
    this.log('warn', msg, data);
  }
  
  error(msg: string, data?: Record<string, any>) {
    this.log('error', msg, data);
  }
  
  child(bindings: Record<string, any>) {
    // For the edge logger, we'll just concatenate the module names
    const modulePrefix = this.module ? `${this.module}/` : '';
    const newModule = bindings.module ? `${modulePrefix}${bindings.module}` : this.module;
    return new EdgeLogger(newModule);
  }
}

// A factory function to create the appropriate logger based on runtime
export function createLogger(module: string) {
  // Check if we're in the Edge runtime
  if (typeof process !== 'undefined' && process.env.NEXT_RUNTIME === 'edge') {
    return new EdgeLogger(module);
  }
  
  // In Node.js runtime, use the regular pino logger
  // Import dynamically to avoid issues in Edge runtime
  const { logger } = require('./logger');
  return logger.child({ module });
}
