'use client';

import { deleteAlbum } from '@/actions/album-actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteAlbumMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await deleteAlbum(id);
      return response;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['albums'],
      });
    },
  });

  return mutation;
}
