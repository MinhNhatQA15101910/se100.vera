'use client';

import React from 'react';

import { dummyAlbums } from './dummyAlbums';
import AlbumCard from '@/components/ui/AlbumCard';

const AlbumList = () => {
  return (
    <div className="grid grid-cols-5 grid-rows-3 w-[90%] gap-2">
      {dummyAlbums.map((album, idx) => {
        return (
          <div key={idx + album.id} className="flex flex-col">
            <AlbumCard
              image={album.image}
              title={album.title}
              artist={album.artist}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AlbumList;
