import React, { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getArtistAlbums } from '@/actions/album-actions';
import { useUser } from '@/contexts/UserContext';
import { useLoading } from '@/contexts/LoadingContext';
import DynamicImage from './custom/DynamicImage';

const AlbumToAddModal = ({ songId }: { songId: number }) => {
  const { userDetails } = useUser();
  const { setLoadingState } = useLoading();
  const { data: albums, isLoading } = useQuery({
    queryKey: ['albums'],
    queryFn: async () => await getArtistAlbums(userDetails?.id || -1),
  });

  const handleAddSongToAlbum = () => {

  }

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  return (
    <div className="grid grid-cols-2">
      {albums?.map((album, index) => {
        return (
          <div
            key={index}
            onClick={handleAddSongToAlbum}
            className="flex flex-row justify-between items-center bg-transparent hover:bg-slate-500/40 rounded-md space-x-6 p-2 transition-colors duration-200"
          >
            <DynamicImage
              src={album.photoUrl}
              alt={album.albumName}
              className="w-14 h-14"
            />

            <span className="text-general-white">{album.albumName}</span>
            <span className="text-general-white">{album.totalSongs}</span>
          </div>
        );
      })}
    </div>
  );
};

export default AlbumToAddModal;
