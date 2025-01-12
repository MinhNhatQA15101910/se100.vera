'server only';

import client from '@/services/client';
import { Album } from '@/types/global';
import { getAuthTokenFromCookies } from './utils';

export interface AddAlbumPayload {
  albumName: string;
  description: string;
  photoFiles?: File[];
  artistIds: number[];
}

export interface EditAlbumPayload {
  albumName: string,
  description: string,
  photoFiles: File[],
  artistIds: number[]
}

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

export async function addAlbum(formData: FormData): Promise<void> {
  const token = await getAuthTokenFromCookies();

  try {
    await client('/api/albums', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  } catch (error) {
    console.error('Error in addSong:', error);
    throw error;
  }
}

// Only artist can add desires songs of their into an album
export async function editAlbum(albumId: number, data: FormData) {
  const token = await getAuthTokenFromCookies();

  try {
    await client<Album[]>(`/api/albums/${albumId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
  } catch (error) {
    console.error('Update an album error: ', error);
    throw error;
  }
}

// Only artist can add desires songs of their into an album
export async function addSongToAlbum(albumId: number, songId: number) {
  const token = await getAuthTokenFromCookies();

  try {
    await client(`/api/albums/add-song/${albumId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ songId }),
    });
  } catch (error) {
    console.error('add a song to an album error: ', error);
    throw error;
  }
}

// Only artist themselves can delete the album
export async function deleteAlbum(albumId: number) {
  const token = await getAuthTokenFromCookies();

  try {
    await client<Album[]>(`/api/albums/${albumId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('delete an album error: ', error);
    throw error;
  }
}
