'server only';

import client from '@/services/client';
import { Playlist } from '@/types/global';

export async function getAllAlbums(): Promise<Playlist[]> {
  try {
    const response = await client<Playlist[]>('/api/playlists', {
      method: 'GET',
    });

    return response.data;
  } catch (error) {
    console.error('get all playlists error: ', error);
    throw error;
  }
}
