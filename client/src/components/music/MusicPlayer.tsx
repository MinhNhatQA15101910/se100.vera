'use client';

import React from 'react';

import usePlayerStore from '@/stores/player-store';

import MusicPlayerContent from '@/components/music/MusicPlayerContent';

const MusicPlayer = () => {
  const { activeSong } = usePlayerStore();

  if (!activeSong?.id) {
    return null;
  }

  return <MusicPlayerContent />;
};

export default MusicPlayer;
