import Sidebar from '@/components/Sidebar';
import React from 'react';
import ProtectedLayout from './ProtectedLayout';

interface ILayoutProps {
  children: React.ReactNode;
}

const layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row h-screen w-full app-background">
      <Sidebar />
      <ProtectedLayout>{children}</ProtectedLayout>
    </div>
  );
};

export default layout;
