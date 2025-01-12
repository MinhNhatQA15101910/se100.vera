'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleUserLock } from '@/actions/user-actions';

export function useToggleLockArtistMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (artistId: number) => {
      await toggleUserLock(artistId); // Gọi API để khóa/mở khóa nghệ sĩ
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['artists'], // Làm mới danh sách nghệ sĩ sau khi thay đổi trạng thái
      });
    },
    onError: (error) => {
      console.error('Error toggling artist lock state:', error);
    },
  });

  return mutation;
}