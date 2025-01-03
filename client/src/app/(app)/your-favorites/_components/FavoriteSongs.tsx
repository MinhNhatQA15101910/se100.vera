'use client';

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllSongs } from '@/actions/song-actions';
import SongCard from '@/components/music/SongCard';
import { useLoading } from '@/contexts/LoadingContext';

const FavoriteSongs = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['favorite_songs'],
    queryFn: async () => {
      return await getAllSongs();
    },
  });

  const { setLoadingState } = useLoading();

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);
  return (
    <div className="flex flex-row justify-between w-[90%] items-center pt-2">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {data?.songs.map((song, index) => <SongCard key={index} song={song} />)}
      </div>
    </div>
  );
};

export default FavoriteSongs;
