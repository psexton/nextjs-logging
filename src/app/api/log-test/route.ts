import { NextResponse } from 'next/server';
import { createLogger } from '@/lib/logger';
const log = createLogger("api/log-test/route");

export async function GET() {
  log.info('API request received');

  return NextResponse.json({ message: 'Logging Test Successful' });
}
