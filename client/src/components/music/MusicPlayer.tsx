'use client';

import React from 'react';

import usePlayerStore from '@/stores/player-store';

import MusicPlayerContent from '@/components/music/MusicPlayerContent';

const Player = () => {
  const { activeSong } = usePlayerStore();

  if (!activeSong?.id) {
    return null;
  }

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <MusicPlayerContent />
    </div>
  );
};

export default Player;
