import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export async function GET() {
  logger.info('API request received', { endpoint: '/api/log-test' });

  return NextResponse.json({ message: 'Logging Test Successful' });
}
