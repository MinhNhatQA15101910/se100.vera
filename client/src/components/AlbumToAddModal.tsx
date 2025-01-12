import React, { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getArtistAlbums } from '@/actions/album-actions';
import { useUser } from '@/contexts/UserContext';
import { useLoading } from '@/contexts/LoadingContext';
import DynamicImage from './custom/DynamicImage';
import { useAddSongToAlbumMutation } from '@/hooks/useAlbumMutation';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const AlbumToAddModal = ({ songId }: { songId: number }) => {
  const router = useRouter();
  const { userDetails } = useUser();
  const { setLoadingState } = useLoading();
  const { data: albums, isLoading } = useQuery({
    queryKey: ['albums'],
    queryFn: async () => await getArtistAlbums(userDetails?.id || -1),
  });
  const addSongToAlbumMutation = useAddSongToAlbumMutation();
  const handleAddSongToAlbum = (albumId: number) => {
    addSongToAlbumMutation.mutate(
      { albumId: albumId, songId: songId },
      {
        onSuccess: () => {
          toast.success('Add successfully!');
          router.refresh();
        },
        onError: () => {
          toast.error('Failed');
        },
      }
    );
  };

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {albums?.map((album, index) => {
        return (
          <div
            key={index}
            onClick={() => handleAddSongToAlbum(album.id)}
            className="flex flex-row justify-between items-center bg-transparent hover:bg-slate-500/40 rounded-md space-x-6 p-2 transition-colors duration-200 cursor-pointer"
          >
            <DynamicImage
              src={album.photoUrl || 'https://picsum.photos/400/400?random=42'}
              alt={album.albumName || ''}
              className="w-14 h-14"
            />

            <span className="text-general-pink">{album.albumName}</span>
            <span className="text-general-white text-nowrap truncate">
              {album.totalSongs} songs
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default AlbumToAddModal;
