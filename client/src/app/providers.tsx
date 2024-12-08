'use client';

import React, { ReactNode } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { UserProvider } from '@/contexts/UserContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <LoadingProvider>
        <UserProvider>
          <ProtectedRoute>
            <NuqsAdapter>
              <TooltipProvider>{children}</TooltipProvider>
            </NuqsAdapter>
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
    </>
  );
}
