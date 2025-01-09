'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  deleteSong,
  addSong,
  AddSongPayload,
  UpdateSongPayload,
  updateSong,
  ToggleFavoriteSongById,
} from '@/actions/song-actions';
import { useUser } from '@/contexts/UserContext';
import { useLoading } from '@/contexts/LoadingContext';

enum Role {
  Admin = 'Admin',
  Artist = 'Artist',
  User = 'User',
}

export function useAddSongMutation() {
  const queryClient = useQueryClient();
  const { userDetails } = useUser();
  const { setLoadingState } = useLoading();

  const mutation = useMutation({
    mutationFn: async (data: AddSongPayload) => {
      setLoadingState(true);

      const formData = new FormData();
      formData.append('songName', data.songName);
      formData.append('description', data.description);
      formData.append('lyricFile', data.lyricFile || '');
      formData.append('musicFile', data.musicFile);
      if (data.photoFiles) {
        data.photoFiles.forEach((file, index) => {
          formData.append(`photoFiles[${index}]`, file);
        });
      }
      data.genreIds.forEach((id: number) => {
        formData.append('genreIds', id.toString());
      });

      data.artistIds.forEach((id: number) => {
        formData.append('artistIds', id.toString());
      });
      if (userDetails?.id && userDetails.roles.includes(Role.Artist)) {
        formData.append('artistIds', userDetails?.id.toString());
      } else {
        throw new Error('You have some problems to add this song bro.');
      }

      const response = await addSong(formData);
      return response;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['songs'],
      });
      setLoadingState(false);
    },
  });

  return mutation;
}

export function useUpdateSongMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateSongPayload;
    }) => {
      const formData = new FormData();
      if (data.songName) formData.append('songName', data.songName);
      if (data.description) formData.append('description', data.description);
      if (data.lyricFile) formData.append('lyricFile', data.lyricFile);
      if (data.musicFile) formData.append('musicFile', data.musicFile);
      if (data.photoFiles) {
        data.photoFiles.forEach((file, index) => {
          formData.append(`photoFiles[${index}]`, file);
        });
      }
      if (data.genreIds) {
        data.genreIds.forEach((id: number) => {
          formData.append('genreIds', id.toString());
        });
      }

      await updateSong(id, formData);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['songs'],
      });
    },
  });

  return mutation;
}

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

export function useLikeSongMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (songId: number) => {
      await ToggleFavoriteSongById(songId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['songs'],
      });
    },
  });

  return mutation;
}
