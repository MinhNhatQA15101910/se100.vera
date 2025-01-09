'use client';

import React from 'react';
import usePlayerStore from '@/stores/player-store';
import Image from 'next/image';

const SongListSideBar = () => {
  const {
    playlist: songs,
    activeSong,
    isPlaying,
    setActiveTrack,
  } = usePlayerStore();

  return (
    <div className="h-screen hidden sticky top-0 md:flex bg-[#181818] w-[300px] text-white flex-col min-h-screen border-l border-l-general-pink shadow-[8px_0px_24.2px_0px_rgba(238,16,176,0.15)] animate-[border-pulse_2s_ease-in-out_infinite]">
      <h2 className="text-xl font-bold p-4">
        Songs <span className="text-general-pink">Queue</span>
      </h2>

      <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-transparent">
        {songs.map((song, idx) => {
          const isActive = activeSong?.id === song.id;
          return (
            <div
              key={idx}
              onClick={() => {
                setActiveTrack(song);
              }}
              className={`w-full flex flex-row p-3 text-general-white items-center gap-4 hover:bg-white/10 transition-colors duration-200 cursor-pointer ${
                isActive ? 'bg-white/20' : ''
              }`}
            >
              <div className="w-5 text-center text-sm">
                {isActive && isPlaying ? (
                  <div className="wave-container">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="wave-bar bg-general-pink animate-pulse"
                      />
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400">{idx + 1}</span>
                )}
              </div>
              <div className="w-12 h-12 relative rounded-md overflow-hidden flex">
                <Image
                  src={song.songPhotoUrl || 'https://picsum.photos/400/400'}
                  alt={song.songName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <p
                  className={`font-semibold text-sm truncate ${isActive ? 'text-general-pink' : 'text-white'}`}
                >
                  {song.songName}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {song.publisherName}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SongListSideBar;
