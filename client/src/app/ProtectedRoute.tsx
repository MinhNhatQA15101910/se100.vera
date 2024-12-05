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

  const publicRoutes = ['/login', '/signup', '/verify-code', '/reset-password'];
  const appRoutes = ['/home', '/discover'];

  useEffect(() => {
    setLoadingState(false);

    if (pathname === '/') {
      if (!isAuthenticated) {
        router.push('/login');
      } else {
        router.push('/home');
      }
      return;
    }

    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      router.push('/login');
      return;
    }

    if (isAuthenticated && publicRoutes.includes(pathname)) {
      router.push('/home');
      return;
    }

    // Redirect to home if not on valid app route while authenticated
    if (
      isAuthenticated &&
      !appRoutes.includes(pathname) &&
      !pathname.startsWith('/')
    ) {
      router.push('/home');
    }
  }, [isAuthenticated, pathname, router, setLoadingState]);

  return <>{children}</>;
};

export default ProtectedRoute