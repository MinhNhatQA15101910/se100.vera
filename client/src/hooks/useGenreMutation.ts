'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLoading } from '@/contexts/LoadingContext';
import {
  addGenre,
  AddGenrePayload,
  updateGenre,
} from '@/actions/genre-actions';

export function useAddGenreMutation() {
  const queryClient = useQueryClient();
  const { setLoadingState } = useLoading();

  const mutation = useMutation({
    mutationFn: async (data: AddGenrePayload) => {
      setLoadingState(true);
      const response = await addGenre(data.genreName);
      return response;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['genres'],
      });
      setLoadingState(false);
    },
  });
  return mutation;
}

export function useUpdateGenreMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: AddGenrePayload }) => {
      const response = await updateGenre(data.genreName, id);
      return response;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['genres'],
      });
    },
  });

  return mutation;
}
