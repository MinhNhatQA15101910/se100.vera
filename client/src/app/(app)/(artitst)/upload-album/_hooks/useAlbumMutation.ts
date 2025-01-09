'use client';

import {
  deleteAlbum,
  addAlbum,
  AddAlbumPayload,
} from '@/actions/album-actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLoading } from '@/contexts/LoadingContext';
import { useUser } from '@/contexts/UserContext';

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

export function useAddAlbumMutation() {
  const queryClient = useQueryClient();
  const { userDetails } = useUser();
  const { setLoadingState } = useLoading();

  const mutation = useMutation({
    mutationFn: async (data: AddAlbumPayload) => {
      setLoadingState(true);

      const formData = new FormData();
      formData.append('albumName', data.albumName);
      formData.append('description', data.description);
      if (data.photoFiles) {
        data.photoFiles.forEach((file, index) => {
          formData.append(`photoFiles[${index}]`, file);
        });
      }
      if (userDetails?.id && userDetails.roles[0] === 'Artist') {
        formData.append('artistIds', userDetails?.id.toString());
      } else {
        throw new Error('You have some problems to add this album bro.');
      }
      data.artistIds.forEach((id: number) => {
        formData.append('artistIds', id.toString());
      });

      await addAlbum(formData);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['albums'],
      });
    },
  });

  return mutation;
}
