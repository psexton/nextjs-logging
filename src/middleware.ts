import { NextRequest, NextResponse } from 'next/server';
import { log } from '@/lib/logger';

export function middleware(req: NextRequest) {
  // Extract IP address from headers (best effort)
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown';

  log('info', `Incoming request: ${req.method} ${req.nextUrl.pathname}`, {
    ip,
    userAgent: req.headers.get('user-agent'),
  });

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*', // Apply middleware only to API routes
};
