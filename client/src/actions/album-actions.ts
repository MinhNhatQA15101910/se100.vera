'server only';

import client from '@/services/client';
import { Album } from '@/types/global';
import { getAuthTokenFromCookies } from './utils';

export async function getAllAlbums(): Promise<Album[]> {
  const token = getAuthTokenFromCookies();

  try {
    const response = await client<Album[]>('/api/albums', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('get all albums error: ', error);
    throw error;
  }
}

export async function getAlbumById({
  albumId,
}: {
  albumId: number;
}): Promise<Album> {
  const token = getAuthTokenFromCookies();

  try {
    const response = await client<Album>(`/api/albums/${albumId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('get album by id error: ', error);
    throw error;
  }
}

export async function getArtistAlbums(artistId: number): Promise<Album[]> {
  const token = getAuthTokenFromCookies();

  try {
    const response = await client<Album[]>(
      `/api/albums?publisherId=${artistId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('get artist albums error: ', error);
    throw error;
  }
}
