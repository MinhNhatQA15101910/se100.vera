'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';


export function useDeleteSongMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await deleteSong(id);
      return response;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['songs'],
      });
    },
  });

  return mutation;
}
