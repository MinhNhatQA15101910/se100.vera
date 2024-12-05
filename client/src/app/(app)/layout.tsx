import Sidebar from '@/components/Sidebar';
import React from 'react';
import ProtectedLayout from './ProtectedLayout';
import Footer from '@/components/AppFooter';

interface ILayoutProps {
  children: React.ReactNode;
}

const layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row h-screen w-full app-background">
      <Sidebar />
      <div className="flex flex-col w-full">
        <ProtectedLayout>{children}</ProtectedLayout>
        <Footer />
      </div>
    </div>
  );
};

export default layout;
