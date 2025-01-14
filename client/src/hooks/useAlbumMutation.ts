'use client';

import {
  addAlbum,
  AddAlbumPayload,
  addSongToAlbum,
  deleteAlbum,
  editAlbum,
  EditAlbumPayload,
} from '@/actions/album-actions';
import { approveAlbum, rejectAlbum } from '@/actions/album-actions';
import { useLoading } from '@/contexts/LoadingContext';
import { useUser } from '@/contexts/UserContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddSongToAlbumMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      albumId,
      songId,
    }: {
      albumId: number;
      songId: number;
    }) => {
      const response = await addSongToAlbum(albumId, songId);
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

export function useDeleteAlbumMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await deleteAlbum(id);
      return response;
    },
    onSuccess: () => {
      console.log('Album deleted successfully!');
      void queryClient.invalidateQueries({
        queryKey: ['albums'],
      });
    },
    onError: (error) => {
      console.error('Error deleting album:', error);
    },
  });

  return mutation;
}

enum Role {
  Artist = 'Artist',
  Listener = 'Listener',
  Admin = 'Admin',
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
      if (userDetails?.id && userDetails.roles.includes(Role.Artist)) {
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

export function useEditAlbumMutation() {
  const queryClient = useQueryClient();
  const { userDetails } = useUser();
  const { setLoadingState } = useLoading();

  const mutation = useMutation({
    mutationFn: async ({
      albumId,
      data,
    }: {
      albumId: number;
      data: EditAlbumPayload;
    }) => {
      setLoadingState(true);

      const formData = new FormData();
      formData.append('albumName', data.albumName);
      formData.append('description', data.description);
      if (data.photoFiles) {
        data.photoFiles.forEach((file, index) => {
          formData.append(`photoFiles[${index}]`, file);
        });
      }
      if (userDetails?.id && userDetails.roles.includes(Role.Artist)) {
        formData.append('artistIds', userDetails?.id.toString());
      } else {
        throw new Error('You have some problems to add this album bro.');
      }
      data.artistIds.forEach((id: number) => {
        formData.append('artistIds', id.toString());
      });

      await editAlbum(albumId, formData);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['albums'],
      });
    },
  });

  return mutation;
}

export function useApproveAlbumMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      await approveAlbum(id); // Gọi API để phê duyệt album
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['albums'], // Làm mới danh sách album sau khi phê duyệt
      });
    },
    onError: (error) => {
      console.error('Error approving the album:', error);
    },
  });

  return mutation;
}

export function useRejectAlbumMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      await rejectAlbum(id); // Gọi API để từ chối album
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['albums'], // Làm mới danh sách album sau khi từ chối
      });
    },
    onError: (error) => {
      console.error('Error rejecting the album:', error);
    },
  });

  return mutation;
}