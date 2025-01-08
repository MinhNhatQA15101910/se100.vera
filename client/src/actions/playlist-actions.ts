'server only';

import client from '@/services/client';
import { Playlist } from '@/types/global';
import { getAuthTokenFromCookies } from './utils';

export interface AddPlaylistPayload {
  playlistName: string;
  description: string;
}

export async function getAllPlaylists(): Promise<Playlist[]> {
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

export async function createPlaylist(formData: FormData): Promise<void> {
  const token = await getAuthTokenFromCookies();

  try {
    await client('/api/playlists', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  } catch (error) {
    console.error('create playlist error: ', error);
    throw error;
  }
}
