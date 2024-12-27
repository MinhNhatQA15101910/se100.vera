'server only';

import client from '@/services/client';
import { Genre } from '@/types/global';

export async function getAllGenres({
  pageSize,
}: {
  pageSize: number;
}): Promise<Genre[]> {
  try {
    const response = await client<Genre[]>(`/api/genres?pageSize=${pageSize}`, {
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    console.error('Fetch Genre Errors: ', error);
    throw error;
  }
}
