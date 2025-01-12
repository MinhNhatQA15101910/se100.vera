'use client';

import { addSongToAlbum, approveAlbum, deleteAlbum, rejectAlbum } from '@/actions/album-actions';
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
        queryKey: ['all_albums'],
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

export function useApproveAlbumMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      await approveAlbum(id); // Gọi API để phê duyệt album
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['albums'], // Làm mới danh sách album sau khi phê duyệt
      });
    },
    onError: (error) => {
      console.error('Error approving the album:', error);
    },
  });

  return mutation;
}

export function useRejectAlbumMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      await rejectAlbum(id); // Gọi API để từ chối album
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['albums'], // Làm mới danh sách album sau khi từ chối
      });
    },
    onError: (error) => {
      console.error('Error rejecting the album:', error);
    },
  });

  return mutation;
}

