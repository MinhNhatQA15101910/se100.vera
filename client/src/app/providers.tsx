'use client';

import React, { ReactNode } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { UserProvider } from '@/contexts/UserContext';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <LoadingProvider>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <NuqsAdapter>
              <TooltipProvider>{children}</TooltipProvider>
            </NuqsAdapter>
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
        </QueryClientProvider>
      </LoadingProvider>
    </>
  );
}
