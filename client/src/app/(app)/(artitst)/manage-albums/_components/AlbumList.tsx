'use client';

import React from 'react';

import AlbumCard from '@/components/ui/AlbumCard';
import { useQuery } from '@tanstack/react-query';
import { getAllAlbums } from '@/actions/album-actions';
import { useLoading } from '@/contexts/LoadingContext';

const AlbumList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['all_albums'],
    queryFn: async () => await getAllAlbums(),
  });
  const { setLoadingState } = useLoading();

  React.useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  return (
    <div className="grid grid-cols-5 grid-rows-3 w-[90%] gap-2">
      {data?.map((album, idx) => {
        return (
          <div key={idx} className="flex flex-col">
            <AlbumCard albumCard={album} />
          </div>
        );
      })}
    </div>
  );
};

export default AlbumList;