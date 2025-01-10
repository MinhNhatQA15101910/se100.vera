'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLoading } from '@/contexts/LoadingContext';
import {
  AddPlaylistPayload,
  createPlaylist,
  deletePlaylist,
  addSongToPlaylist,
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

export function useAddSongToPlaylistMutation() {
  const queryClient = useQueryClient();
  const { setLoadingState } = useLoading();

  const mutation = useMutation({
    mutationFn: async ({
      playlistId,
      songId,
    }: {
      playlistId: number;
      songId: number;
    }) => {
      setLoadingState(true);

      try {
        await addSongToPlaylist(playlistId, songId);
      } catch (error) {
        console.error('Error adding song to playlist:', error);
        throw error;
      } finally {
        setLoadingState(false);
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['playlists'],
      });
    },
  });

  return mutation;
}
