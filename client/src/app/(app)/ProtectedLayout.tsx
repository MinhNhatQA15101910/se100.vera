'use client';

import React from 'react';
import { useUser } from '@/contexts/UserContext';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUser();
  return <>{isAuthenticated && children}</>;
};

export default ProtectedLayout;
