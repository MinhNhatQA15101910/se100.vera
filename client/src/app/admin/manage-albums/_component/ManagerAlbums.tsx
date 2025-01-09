'use client';

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllAlbums } from '@/actions/album-actions';
import { useLoading } from '@/contexts/LoadingContext';
import AdminAlbumCard from '@/components/ui/AdminAlbumCard';

const ManageAlbums = () => {
  const { setLoadingState } = useLoading();

  const { data, isLoading } = useQuery({
    queryKey: ['manage_albums'],
    queryFn: async () => await getAllAlbums(),
  });

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  return (
    <div className="h-fit flex w-[90%] flex-col">
      <h2 className="text-2xl font-bold mb-4">
        All <span className="text-pink-500">Albums</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.map((album, idx) => {
          return <AdminAlbumCard key={idx} albumCard={album} />;
        })}
      </div>
    </div>
  );
};

export default ManageAlbums;
