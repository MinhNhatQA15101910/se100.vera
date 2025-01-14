'use client';

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllAlbums } from '@/actions/album-actions';
import { useLoading } from '@/contexts/LoadingContext';
import AlbumCard from '@/components/ui/AlbumCard';

const TopAlbums = () => {
  const { setLoadingState } = useLoading();

  const { data, isLoading } = useQuery({
    queryKey: ['albums'],
    queryFn: async () => await getAllAlbums(),
  });

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  return (
    <div className="h-fit flex w-[90%] flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.map((album, idx) => {
          return <AlbumCard key={idx} albumCard={album} />;
        })}
      </div>
    </div>
  );
};

export default TopAlbums;
