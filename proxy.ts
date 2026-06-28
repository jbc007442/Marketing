import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('marketflow_token')?.value;

  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/email') || pathname.startsWith('/whatsapp')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!);

      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL('/login', request.url));

      response.cookies.delete('marketflow_token');

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/email/:path*', '/whatsapp/:path*'],
};
