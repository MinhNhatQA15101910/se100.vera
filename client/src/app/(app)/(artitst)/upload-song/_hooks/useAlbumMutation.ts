'use client';

import { addSongToAlbum, deleteAlbum } from '@/actions/album-actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddSongToAlbumMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      albumId,
      songId,
    }: {
      albumId: number;
      songId: number;
    }) => {
      const response = await addSongToAlbum(albumId, songId);
      return response;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['manage_albums'],
      });
    },
  });

  return mutation;
}

export function useDeleteAlbumMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await deleteAlbum(id);
      return response;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['manage_albums'],
      });
    },
  });

  return mutation;
}
