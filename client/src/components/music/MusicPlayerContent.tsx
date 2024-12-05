'use client';

import React from 'react';

import usePlayerStore from '@/stores/player-store';

import TrackInfo from './TrackInfo';
import PlayerControls from './PlayerControls';
import VolumeControl from './VolumeControl';
import Playlist from './Playlist';

const Player = () => {
  const { setPlaylist } = usePlayerStore();

  const examplePlaylist = [
    { id: '1', title: 'Song 1', artist: 'Artist 1', url: '/song1.mp3' },
    { id: '2', title: 'Song 2', artist: 'Artist 2', url: '/song2.mp3' },
    { id: '3', title: 'Song 3', artist: 'Artist 3', url: '/song3.mp3' },
  ];

  React.useEffect(() => {
    setPlaylist(examplePlaylist);
  }, [setPlaylist]);

  return (
    <div className="absolute bottom-0 left-0 w-full max-w-xl mx-auto bg-red-700 shadow-md p-4">
      <TrackInfo />
      <PlayerControls />
      <VolumeControl />
      <Playlist />
    </div>
  );
};

export default Player;
