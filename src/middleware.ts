import { NextRequest, NextResponse } from 'next/server';
import { createLogger } from '@/lib/logger';
const log = createLogger('middleware');

export function middleware(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for') ||
    req.headers.get('cf-connecting-ip') ||
    'unknown';

  log.info('Incoming request', {
    method: req.method,
    path: req.nextUrl.pathname,
    ip,
    userAgent: req.headers.get('user-agent'),
  });

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
