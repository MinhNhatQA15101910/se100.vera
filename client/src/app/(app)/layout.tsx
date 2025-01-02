'use client';
import Sidebar from '@/components/Sidebar';
import React from 'react';
import ProtectedLayout from './ProtectedLayout';
import Footer from '@/components/AppFooter';
import MusicPlayer from '@/components/music/MusicPlayer';
import SongListSideBar from '@/components/SongListSideBar';
import usePlayerStore from '@/stores/player-store';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const { activeSong, isPlaylistVisibility } = usePlayerStore();
  const musicPlayerHeight = activeSong ? '94px' : '0px';

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div
        className="flex flex-row flex-1"
        style={{ paddingBottom: musicPlayerHeight }}
      >
        <Sidebar />
        <div className="flex flex-col flex-1">
          <div className="relative w-full h-full">
            <ProtectedLayout>{children}</ProtectedLayout>
          </div>
        </div>
        {isPlaylistVisibility && (
          <div className="relative">
            <SongListSideBar />
          </div>
        )}
      </div>
      <div
        className={`fixed bottom-0 left-0 w-full bg-gray-900`}
        style={{
          height: musicPlayerHeight,
          transition: 'height 0.3s ease-in-out',
        }}
      >
        <MusicPlayer />
      </div>
    </div>
  );
};

export default Layout;
