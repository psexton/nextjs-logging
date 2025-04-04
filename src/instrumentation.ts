import { registerOTel } from '@vercel/otel'
 
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await require('pino')
    await require('next-logger')
  }

  registerOTel({ serviceName: 'next-logging' })
}
