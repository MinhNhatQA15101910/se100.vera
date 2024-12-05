'use client';

import React, { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { UserProvider } from '@/contexts/UserContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({
  subsets: ['vietnamese'],
  weight: ['400', '700'], // Specify the weights you need
  variable: '--font-inter', // Define a CSS variable for the font
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <div className={`${inter.variable} font-sans`}>
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
