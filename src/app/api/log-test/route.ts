import { NextResponse } from 'next/server';
import { log } from '@/lib/logger';

export async function GET() {
    log('info', 'GET request received at /api/log-test');
    return NextResponse.json({ message: 'Logging Test Successful' });
}
