'server only';

import client from '@/services/client';
import { Album } from '@/types/global';

export async function getAllAlbums(): Promise<Album[]> {
  try {
    const response = await client<Album[]>('/api/albums', {
      method: 'GET',
    });

    return response.data;
  } catch (error) {
    console.error('get all albums error: ', error);
    throw error;
  }
}
