import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/login', '/signup', '/verify-code', '/reset-password'];
const HOME_URL = '/home';
const LOGIN_URL = '/login';
const ADMIN_HOME_URL = '/admin/home';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')?.value;
  const userDetails = request.cookies.get('userDetails')?.value;
  const currentPath = request.nextUrl.pathname;

  // Handle discover redirect first
  if (currentPath === '/discover') {
    return NextResponse.redirect(new URL('/discover/trending-songs', request.url));
  }

  // Handle unauthenticated users
  if (!authToken || !userDetails) {
    return publicRoutes.includes(currentPath)
      ? NextResponse.next()
      : NextResponse.redirect(new URL(LOGIN_URL, request.url));
  }

  // Parse user details
  const decodedUserDetails = JSON.parse(decodeURIComponent(userDetails));
  const userRoles = decodedUserDetails.roles || [];

  // Handle verification and reset password routes
  if (currentPath.startsWith('/verify-code') || currentPath.startsWith('/reset-password')) {
    return NextResponse.next();
  }

  // Handle admin users
  if (userRoles.includes('Admin')) {
    return currentPath.startsWith('/admin')
      ? NextResponse.next()
      : NextResponse.redirect(new URL(ADMIN_HOME_URL, request.url));
  }

  // Handle authenticated users on public routes
  if (publicRoutes.includes(currentPath) || currentPath === '/') {
    return NextResponse.redirect(new URL(HOME_URL, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/home',
    '/discover/:path*',
    '/artists',
    '/albums', 
    '/playlists',
    '/playlist-detail/:id*',
    '/album-detail/:id*',
    '/artist-detail/:id*',
    '/recently-added',
    '/login',
    '/signup',
    '/verify-code',
    '/reset-password',
    '/admin',
    '/admin/:path*',
  ],
};
