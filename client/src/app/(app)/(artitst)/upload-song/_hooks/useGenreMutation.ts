'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@/contexts/UserContext';
import { useLoading } from '@/contexts/LoadingContext';
import { addGenre, AddGenrePayload } from '@/actions/genre-actions';

export function useAddSongMutation() {
  const queryClient = useQueryClient();
  const { userDetails } = useUser();
  const { setLoadingState } = useLoading();

  const mutation = useMutation({
    mutationFn: async (data: AddGenrePayload) => {
      setLoadingState(true);

      const formData = new FormData();
      formData.append('genreName', data.genreName);
      const response = await addGenre(formData);
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
