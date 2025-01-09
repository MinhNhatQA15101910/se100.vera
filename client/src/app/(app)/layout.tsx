import Sidebar from '@/components/Sidebar';
import React from 'react';
import ProtectedLayout from './ProtectedLayout';
import MusicPlayer from '@/components/music/MusicPlayer';
import SongQueueList from '../_components/SongQueueList';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex flex-row flex-1">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <div className="relative w-full h-full">
            <ProtectedLayout>{children}</ProtectedLayout>
          </div>
        </div>
        <SongQueueList />
      </div>
      <div
        className={`fixed bottom-0 left-0 w-full bg-gray-900`}
        style={{
          transition: 'height 0.3s ease-in-out',
        }}
      >
        <MusicPlayer />
      </div>
    </div>
  );
};

export default Layout;
