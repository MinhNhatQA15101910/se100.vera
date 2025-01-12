'server only';

import client from '@/services/client';
import { Comment } from '@/types/global';
import { getAuthTokenFromCookies } from './utils';

export interface AddCommentPayload {
   songId: number;
   content: string;
}

export async function getComments(songId?: number): Promise<Comment[]> {
   try {
      const response = await client<Comment[]>(`/api/comments?songId=${songId}`);

      return response.data;
   } catch (error) {
      console.error('Get comments error: ', error);
      throw error;
   }
}

export async function addComment(payload: AddCommentPayload): Promise<Comment> {
   const token = await getAuthTokenFromCookies();
   try {
      const response = await client<Comment>('/api/comments', {
         method: 'POST',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(payload),
      });

      return response.data;
   } catch (error) {
      console.error('Add comment error: ', error);
      throw error;
   }
}

export async function updateComment(id: number, content: string): Promise<Comment> {
   const token = await getAuthTokenFromCookies();
   try {
      const response = await client<Comment>(`/api/comments/${id}`, {
         method: 'PUT',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ content }),
      });

      return response.data;
   } catch (error) {
      console.error('Edit comment error: ', error);
      throw error;
   }
}

export async function deleteComment(id: number): Promise<void> {
   const token = await getAuthTokenFromCookies();
   try {
      await client<void>(`/api/comments/${id}`, {
         method: 'DELETE',
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
   }
   catch (error) {
      console.error('Delete comment error: ', error);
      throw error;
   }
}

