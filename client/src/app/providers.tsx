'use client';

import React, { ReactNode, useEffect } from 'react';
import { Inter } from 'next/font/google';
import { useRouter, usePathname } from 'next/navigation';
import { useUser, UserProvider } from '@/contexts/UserContext';
import { LoadingProvider, useLoading } from '@/contexts/LoadingContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IProtectedRoute {
  children: ReactNode;
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
  const { isAuthenticated } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { setIsLoading } = useLoading();

  const publicRoutes = ['/login', '/signup', '/verify-code', '/reset-password'];
  const appRoutes = ['/home', '/discover'];

  useEffect(() => {
    setIsLoading(false);

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
    if (isAuthenticated && !appRoutes.includes(pathname) && !pathname.startsWith('/')) {
      router.push('/home');
    }

  }, [isAuthenticated, pathname, router, setIsLoading]);

  return <>{children}</>;
};

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <div className={`${inter.variable} font-sans`}>
      <LoadingProvider>
        <UserProvider>
          <ProtectedRoute>{children}</ProtectedRoute>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </UserProvider>
      </LoadingProvider>
    </div>
  );
}
