'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  deleteSong,
  addSong,
  UpdateSongPayload,
} from '@/actions/song-actions';
import { AddSongPayload } from '@/actions/song-actions';

export function useAddSongMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: AddSongPayload) => {
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
      formData.append('genreIds', data.genreIds.join(','));
      formData.append('artistIds', data.artistIds.join(','));

      const response = await addSong(formData);
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

export function useDeleteSongMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await deleteSong({ songId: id });
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
