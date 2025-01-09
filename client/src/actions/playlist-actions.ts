'server only';

import client from '@/services/client';
import { Playlist } from '@/types/global';
import { getAuthTokenFromCookies } from './utils';

export interface AddPlaylistPayload {
  playlistName: string;
  description: string;
}

export async function getAllPlaylists(): Promise<Playlist[]> {
  const token = await getAuthTokenFromCookies();

  try {
    const response = await client<Playlist[]>('/api/playlists', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('get all playlists error: ', error);
    throw error;
  }
}

export async function getOwnPlaylist(userId: number): Promise<Playlist[]> {
  const token = await getAuthTokenFromCookies();

  try {
    const response = await client<Playlist[]>(
      `/api/playlists?publisherId=${userId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('get all playlists error: ', error);
    throw error;
  }
}

export async function getPlaylistById(playlistId: number): Promise<Playlist> {
  const token = await getAuthTokenFromCookies();

  try {
    const response = await client<Playlist>(`/api/playlists/${playlistId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('get playlist by id error: ', error);
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
