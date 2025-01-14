'use client';

import React from 'react';

import AlbumCard from '@/components/ui/AlbumCard';
import { useQuery } from '@tanstack/react-query';
import { getArtistAlbums } from '@/actions/album-actions';
import { useLoading } from '@/contexts/LoadingContext';
import { useUser } from '@/contexts/UserContext';

const AlbumList = () => {
  const { userDetails } = useUser();
  const { data, isLoading } = useQuery({
    queryKey: ['albums'],
    queryFn: async () => await getArtistAlbums(userDetails?.id || -1),
  });
  const { setLoadingState } = useLoading();

  React.useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading, data]);

  if (!data) {
    return null;
  }

  return (
    <div className="grid grid-cols-5 grid-rows-3 w-[90%] gap-2">
      {data.map((album, idx) => {
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
