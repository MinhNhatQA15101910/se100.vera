import Sidebar from '@/components/Sidebar';
import React from 'react';
import ProtectedLayout from './ProtectedLayout';
import Footer from '@/components/AppFooter';
import MusicPlayer from '@/components/music/MusicPlayer';
interface ILayoutProps {
  children: React.ReactNode;
}

const layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-col w-full">
        <ProtectedLayout>{children}</ProtectedLayout>
        <Footer />
      </div>
      <MusicPlayer />
    </div>
  );
};

export default layout;
