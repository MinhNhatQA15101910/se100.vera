'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLoading } from '@/contexts/LoadingContext';
import {
  activateArtistAccount,
  uploadUserPhoto,
  EditUserPayload,
  ChangePasswordPayload,
  changePassword,
} from '@/actions/user-actions';

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

export function useUploadUserPhotoMutation() {
  const queryClient = useQueryClient();
  const { setLoadingState } = useLoading();

  const mutation = useMutation({
    mutationFn: async (data: EditUserPayload) => {
      setLoadingState(true);

      const formData = new FormData();

      formData.append('file', data.photoFile);

      await uploadUserPhoto(formData);
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

export function useChangePasswordMutation() {
  const { setLoadingState } = useLoading();

  const mutation = useMutation({
    mutationFn: async (data: ChangePasswordPayload) => {
      setLoadingState(true);

      await changePassword(data);
    },
    onSuccess: () => {
      setLoadingState(false);
    },
  });

  return mutation;
}
