'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFavoriteSongs } from '@/actions/song-actions';
import SongCard from '@/components/music/SongCard';
import { useLoading } from '@/contexts/LoadingContext';
import PaginationButtons from '@/components/PaginatedButtons';
import usePlayerStore from '@/stores/player-store';

const FavoriteSongs = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 12;

  const { setPlaylist } = usePlayerStore();
  const { data, isLoading } = useQuery({
    queryKey: ['songs'],
    queryFn: async () => {
      return await getFavoriteSongs({
        pageNumber: currentPage,
        pageSize: pageSize,
      });
    },
  });

  const { setLoadingState } = useLoading();

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  if (data?.songs.length === 0) {
    return (
      <div className="flex flex-col w-[90%]">
        <div className="flex text-xl flex-row justify-between items-center text-general-pink">
          Nothing you liked yet you idiot.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-[90%]">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">
          Favorites <span className="text-pink-500">Songs</span>
        </h2>
        <h2 className="text-2xl font-bold mb-4 ">
          <span
            onClick={() => {
              setPlaylist(data?.songs || []);
            }}
            className="text-pink-500 cursor-pointer hover:text-general-blue-hover transition-colors"
          >
            Play All
          </span>
        </h2>
      </div>
      <div className="flex flex-col justify-between w-[90%] items-center pt-2 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data?.songs.map((song, index) => (
            <SongCard key={index} song={song} />
          ))}
        </div>

        <PaginationButtons
          pageSize={10}
          currentPage={currentPage}
          totalCount={data?.pagination.totalItems || 0}
          onPageChange={(newPage: number) => {
            setCurrentPage(newPage);
          }}
        />
      </div>
    </div>
  );
};

export default FavoriteSongs;
