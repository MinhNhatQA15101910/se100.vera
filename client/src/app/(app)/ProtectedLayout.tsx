'use client';

import React from 'react';
import { useUser } from '@/contexts/UserContext';
import usePlayerStore from '@/stores/player-store';
import Footer from '@/components/AppFooter';
import Lyric from '@/components/music/lyrics';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUser();
  const { isLyricMode } = usePlayerStore();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <div>
        {children}
        <Footer />
      </div>
      <div>
        {isLyricMode && (
          <div className="absolute top-0 left-0 flex flex-col items-center justify-center min-h-screen h-full w-full bg-[#181818]">
            <Lyric />
          </div>
        )}
      </div>
    </>
  );
};

export default ProtectedLayout;
