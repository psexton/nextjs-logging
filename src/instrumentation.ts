import { registerOTel } from '@vercel/otel'
 
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await require('pino')         // eslint-disable-line @typescript-eslint/no-require-imports
    await require('next-logger')  // eslint-disable-line @typescript-eslint/no-require-imports
  }

  registerOTel({ serviceName: 'next-logging' })
}
