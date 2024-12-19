import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/login', '/signup', '/verify-code', '/reset-password'];

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')?.value;
  const currentPath = request.nextUrl.pathname;

  if (authToken) {
    if (publicRoutes.includes(currentPath)) {
      return NextResponse.redirect(new URL('/home', request.url));
    }

    if (currentPath === '/') {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  } else {
    if (!publicRoutes.includes(currentPath)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/home',
    '/discover',
    '/artists',
    '/albums',
    '/album-detail',
    '/artist-detail',
    '/recently-added',
    '/login',
    '/signup',
    '/verify-code',
    '/reset-password',
  ],
};
