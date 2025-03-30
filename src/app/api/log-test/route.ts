import { NextResponse } from 'next/server';
import { log } from '@/lib/logger';

export async function GET() {
  log('info', 'API request received', { endpoint: '/api/log-test' });

  return NextResponse.json({ message: 'Logging Test Successful' });
}
