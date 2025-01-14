'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLoading } from '@/contexts/LoadingContext';
import {
  activateArtistAccount,
  uploadUserPhoto,
  EditUserPayload,
  ChangePasswordPayload,
  changePassword,
  UpdateUserPayload,
  updateUser,
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
    onError: () => {
      setLoadingState(false)
    }
  });

  return mutation;
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient(); 
  const { setLoadingState } = useLoading();

  const mutation = useMutation({
    mutationFn: async (data: UpdateUserPayload) => {
      setLoadingState(true);

      const formData = new FormData();

      if (data.firstName) formData.append('firstName', data.firstName);
      if (data.lastName) formData.append('lastName', data.lastName);
      if (data.artistName) formData.append('artistName', data.artistName);
      if (data.gender) formData.append('gender', data.gender);
      if (data.about) formData.append('about', data.about);
      if (data.photoFile) formData.append('photoFile', data.photoFile);
      // if (data.dateOfBirth) formData.append('dateOfBirth', data.dateOfBirth.toISOString());

      await updateUser(formData);
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
