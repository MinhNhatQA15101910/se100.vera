'use client';

import React, { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { useLoading } from '@/contexts/LoadingContext';

interface IProtectedRoute {
  children: ReactNode;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
  const { isAuthenticated } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { setLoadingState } = useLoading();

  // Define route categories
  const publicRoutes = ['/login', '/signup', '/verify-code', '/reset-password'];
  const appRoutes = [
    '/home',
    '/discover',
    '/artists',
    '/albums',
    '/artist-detail',
    '/recently-added',

  ];

  useEffect(() => {
    setLoadingState(false); // Stop loading indicator

    // Handle root route `/`
    if (pathname === '/') {
      if (isAuthenticated) {
        router.push('/home'); // Redirect authenticated user to home
      } else {
        router.push('/login'); // Redirect unauthenticated user to login
      }
      return;
    }

    // Handle unauthenticated user trying to access protected routes
    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      router.push('/login');
      return;
    }

    // Handle authenticated user trying to access public routes
    if (isAuthenticated && publicRoutes.includes(pathname)) {
      router.push('/home');
      return;
    }

    // Handle authenticated user accessing invalid routes
    if (isAuthenticated && !appRoutes.includes(pathname)) {
      router.push('/home'); 
    }
  }, [isAuthenticated, pathname, router, setLoadingState]);

  return <>{children}</>;
};

export default ProtectedRoute;
