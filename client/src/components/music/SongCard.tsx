'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import PlayButton from './PlayButton';

import usePlayerStore from '@/stores/player-store';

const SongCard = ({ song }: { song: any }) => {
  const { setActiveTrack } = usePlayerStore();
  const handlePlayMusic = () => {
    setActiveTrack({
      ...song,
    });
  };

  useEffect(() => {
    console.log('song cua tao: ', song);
  }, [song]);

  return (
    <div className="group border border-zinc-100/10 hover:bg-zinc-100/10 rounded-md hover:cursor-pointer transition-colors duration-400 relative">
      <div className="p-4">
        <div className="aspect-square relative mb-3 rounded-md overflow-hidden">
          <Image
            src={song.songPhotoUrl || 'https://picsum.photos/400/400?random=13'}
            alt={`${song.songName} by ${'Hustlang Khiem'}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="space-y-1 min-w-0 mr-2">
            <h3 className="font-semibold text-sm text-white truncate">
              {song.songName}
            </h3>
            <p className="text-xs text-gray-400 truncate">{'Hustlang Khiem'}</p>
          </div>
          <PlayButton onClick={handlePlayMusic} />
        </div>
      </div>
    </div>
  );
};

export default SongCard;
