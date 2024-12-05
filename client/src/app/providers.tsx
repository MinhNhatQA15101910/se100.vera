'use client';

import React, { ReactNode } from 'react';
import { Noto_Serif_JP } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { UserProvider } from '@/contexts/UserContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { ToastContainer } from 'react-toastify'; 
import ProtectedRoute from './ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-serif-jp',
});
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <div className={`${notoSerifJP.variable} font-serif`}>
      <LoadingProvider>
        <UserProvider>
          <ProtectedRoute>
            <NuqsAdapter>{children}</NuqsAdapter>
          </ProtectedRoute>
          <ToastContainer
            position="top-right"
            autoClose={2699}
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
