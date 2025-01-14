'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLoading } from '@/contexts/LoadingContext';
import {
  addGenre,
  AddGenrePayload,
  deleteGenre,
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

export function useDeleteGenreMutation() {
  const queryClient = useQueryClient();
  const { setLoadingState } = useLoading();

  const mutation = useMutation({
    mutationFn: async (genreId: number) => {
      setLoadingState(true);
      await deleteGenre(genreId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['genres'],
      });
      setLoadingState(false);
    },
    onError: (error) => {
      console.error('Error deleting genre:', error);
      setLoadingState(false);
    },
  });

  return mutation;
}