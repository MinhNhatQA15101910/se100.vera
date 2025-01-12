'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLoading } from '@/contexts/LoadingContext';
import * as commentActions from '@/actions/comment-actions';

export function useAddCommentMutation() {
  const queryClient = useQueryClient();
  const { setLoadingState } = useLoading();

  const mutation = useMutation({
    mutationFn: async (data: commentActions.AddCommentPayload) => {
      setLoadingState(true);
      const response = await commentActions.addComment(data);
      return response;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['comments'],
      });
      setLoadingState(false);
    },
    onError: () => {
      setLoadingState(false);
    }
  });

  return mutation;
}

export function useUpdateCommentMutation() {
  const queryClient = useQueryClient();
  const { setLoadingState } = useLoading();

  const mutation = useMutation({
    mutationFn: async ({ commentId, content }: { commentId: number; content: string }) => {
      setLoadingState(true);
      console.log('commentId', commentId, 'content', content);
      const response = await commentActions.updateComment(commentId, content);
      return response;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['comments'],
      });
      setLoadingState(false);
    },
    onError: () => {
      setLoadingState(false);
    }
  });

  return mutation;
}

export function useDeleteCommentMutation() {
  const queryClient = useQueryClient();
  const { setLoadingState } = useLoading();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      setLoadingState(true);
      const response = await commentActions.deleteComment(id);
      return response;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['comments'],
      });
      setLoadingState(false);
    },
    onError: () => {
      setLoadingState(false);
    }
  });

  return mutation;
}