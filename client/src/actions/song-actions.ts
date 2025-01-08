'server only';

import { Song } from '@/types/global';
import client from '@/services/client';

import { getAuthTokenFromCookies } from './utils';

export interface SongsResponse {
  songs: Song[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface AddSongPayload {
  songName: string;
  description: string;
  musicFile: File;
  photoFiles?: File[];
  lyricFile?: File;
  genreIds: number[];
  artistIds: number[];
}

export interface UpdateSongPayload {
  songName?: string;
  description?: string;
  lyricFile?: File;
  musicFile?: File;
  photoFiles?: File[];
  genreIds?: number[];
}

export interface AddSongResponse {
  id: number;
  songName: string;
}

export async function getAllSongs(
  pageNumber?: number,
  pageSize?: number
): Promise<SongsResponse> {
  const token = await getAuthTokenFromCookies();

  try {
    const response = await client<Song[]>(
      !pageNumber || !pageSize
        ? `/api/songs`
        : `/api/songs?pageNumber=${pageNumber}&pageSize=${pageSize}`,

      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const paginationHeader = response.headers.get('Pagination');
    if (!paginationHeader) {
      throw new Error('Pagination data not found in headers');
    }

    const pagination = JSON.parse(paginationHeader);

    if (!response.headers.get('Content-Type')?.includes('application/json')) {
      throw new Error('Response does not contain valid JSON data');
    }

    return {
      songs: response.data,
      pagination,
    };
  } catch (error) {
    console.error('Error in getAllSongs:', error);
    throw error;
  }
}

export async function getSongById(songId: number): Promise<Song> {
  try {
    const response = await client<Song>(`/api/songs/${songId}`, {
      method: 'GET',
    });

    return response.data;
  } catch (error) {
    console.error('Error in getSongById:', error);
    throw error;
  }
}

// Only Artist can Add Songs
export async function addSong(formData: FormData): Promise<AddSongResponse> {
  const token = await getAuthTokenFromCookies();

  try {
    const response = await client<Song>('/api/songs', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return {
      id: response.data.id,
      songName: response.data.songName,
    };
  } catch (error) {
    console.error('Error in addSong:', error);
    throw error;
  }
}

//Only Artist can update a song
export async function updateSong(
  songId: number,
  formData: FormData
): Promise<void> {
  const token = await getAuthTokenFromCookies();

  try {
    await client(`/api/songs/${songId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  } catch (error) {
    console.error('update a song error: ', error);
    throw error;
  }
}

// Only Artist can delete a song
export async function deleteSong(songId: number): Promise<void> {
  const token = await getAuthTokenFromCookies();

  try {
    await client(`/api/songs/${songId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('delete a song error: ', error);
    throw error;
  }
}
