'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLoading } from '@/contexts/LoadingContext';
import {
  AddPlaylistPayload,
  createPlaylist,
  deletePlaylist,
} from '@/actions/playlist-actions';

export function useAddPlaylistMutation() {
  const queryClient = useQueryClient();
  const { setLoadingState } = useLoading();

  const mutation = useMutation({
    mutationFn: async (data: AddPlaylistPayload) => {
      setLoadingState(true);

      const formData = new FormData();
      formData.append('playlistName', data.playlistName);
      formData.append('description', data.description);

      await createPlaylist(formData);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['playlists'],
      });
      setLoadingState(false);
    },
  });

  return mutation;
}

export const useDeletePlaylistMutation = () => {
  const queryClient = useQueryClient();
  const { setLoadingState } = useLoading();

  const mutation = useMutation({
    mutationFn: async (playlistId: number) => {
      setLoadingState(true);

      await deletePlaylist(playlistId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['playlists'],
      });
      setLoadingState(false);
    },
  });

  return mutation;
};
