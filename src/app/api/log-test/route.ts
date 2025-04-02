import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
const log = logger.child({ module: "api/log-test/route" });

export async function GET() {
  log.info('API request received');

  return NextResponse.json({ message: 'Logging Test Successful' });
}
