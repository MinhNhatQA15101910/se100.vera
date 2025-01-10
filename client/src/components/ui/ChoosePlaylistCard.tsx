'use client';

import React, { useEffect } from 'react';
import { useLoading } from '@/contexts/LoadingContext';
import { useQuery } from '@tanstack/react-query';
import { getOwnPlaylist } from '@/actions/playlist-actions';
import { useUser } from '@/contexts/UserContext';
import { useAddSongToPlaylistMutation } from '@/hooks/usePlaylistMutation';
import DynamicImage from '../custom/DynamicImage';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function ChoosePlaylistCard({
  songId,
  closeModal,
}: {
  songId: number;
  closeModal?: () => void;
}) {
  const router = useRouter();
  const { setLoadingState } = useLoading();
  const { userDetails } = useUser();
  const { data: ownPlaylists, isLoading } = useQuery({
    queryKey: ['playlists', userDetails?.id],
    queryFn: async () => {
      if (!userDetails?.id) {
        throw new Error('User ID is not available');
      }
      return await getOwnPlaylist(userDetails.id);
    },
  });
  const addSongToPlaylistMutation = useAddSongToPlaylistMutation();

  const handleAddSongToPlaylist = (playlistId: number) => {
    addSongToPlaylistMutation.mutate(
      { playlistId: playlistId, songId: songId },
      {
        onSuccess: () => {
          toast.success('Added successfully!');
          if (closeModal) {
            closeModal();
          }
          router.refresh();
        },
        onError: (error) => {
          console.error('Error adding song to playlist:', error);
          toast.error('Failed to add song to playlist');
        },
      }
    );
  };

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading, setLoadingState]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {ownPlaylists?.map((playlist) => {
        return (
          <div
            key={playlist.id}
            onClick={() => handleAddSongToPlaylist(playlist.id)}
            className="flex flex-row justify-between items-center bg-transparent hover:bg-slate-500/40 rounded-md space-x-6 p-2 transition-colors duration-200 cursor-pointer"
          >
            <DynamicImage
              src={'https://picsum.photos/400/400'}
              alt={playlist.playlistName || ''}
              className="w-14 h-14"
            />

            <span className="text-general-pink text-nowrap">{playlist.playlistName}</span>
            <span className="text-general-white text-nowrap truncate">
              {playlist.totalSongs} songs
            </span>
          </div>
        );
      })}
    </div>
  );
}
