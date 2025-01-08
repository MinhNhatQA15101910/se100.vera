'use client';

import React from 'react';
import usePlayerStore from '@/stores/player-store';
import SongListSideBar from '@/components/SongListSideBar';

const SongQueueList = () => {
  const { isPlaylistVisibility } = usePlayerStore();

  return (
    <>
      {isPlaylistVisibility && (
        <div className="relative">
          <SongListSideBar />
        </div>
      )}
    </>
  );
};

export default SongQueueList;
