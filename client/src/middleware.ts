import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/login', '/signup', '/verify-code', '/reset-password'];

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')?.value;
  const userDetails = request.cookies.get('userDetails')?.value;
  const currentPath = request.nextUrl.pathname;

  if (authToken && userDetails) {
    const decodedUserDetails = JSON.parse(decodeURIComponent(userDetails));
    const userRoles = decodedUserDetails.roles || [];

    if (userRoles.includes('Admin')) {
      if (currentPath.startsWith('/admin')) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL('/admin/home', request.url));
      }
    }

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

  if (currentPath === '/discover') {
    return NextResponse.redirect('/discover/trending-songs');
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/home',
    '/discover/:path*', // Using :path* for better pattern matching of nested routes
    '/artists',
    '/albums',
    '/playlists',
    '/playlist-detail/:id*',
    '/album-detail/:id*', // Added :id* to handle dynamic album IDs
    '/artist-detail/:id*', // Added :id* to handle dynamic artist IDs
    '/recently-added',
    '/login',
    '/signup',
    '/verify-code',
    '/reset-password',
    '/admin', // Added admin route for admin users
    '/admin/:path*'
  ],
};
