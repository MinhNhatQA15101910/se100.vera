'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLoading } from '@/contexts/LoadingContext';
import { activateArtistAccount } from '@/actions/user-actions';

export function useActivateArtistAccountMutation() {
  const queryClient = useQueryClient();
  const { setLoadingState } = useLoading();

  const mutation = useMutation({
    mutationFn: async (data: { artistName: string; description: string }) => {
      setLoadingState(true);

      await activateArtistAccount(data.artistName, data.description);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['artists'],
      });
      setLoadingState(false);
    },
  });

  return mutation;
}
