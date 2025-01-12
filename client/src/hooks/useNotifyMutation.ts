'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLoading } from '@/contexts/LoadingContext';
import * as notifyActions from '@/actions/notify-actions';

export function useMarkReadNotifyMutation() {
  const queryClient = useQueryClient();
  const { setLoadingState } = useLoading();

  const mutation = useMutation({
    mutationFn: async (notifyId: number) => {
      setLoadingState(true);
      const response = await notifyActions.markNotificationAsRead(notifyId);
      return response;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
      setLoadingState(false);
    },
    onError: () => {
      setLoadingState(false);
    }
  });

  return mutation;
}
