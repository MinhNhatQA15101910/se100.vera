'server only';

import { Song } from '@/types/global';
import client from '@/services/client';

import { getAuthTokenFromServerCookies } from './actions';

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
  lyricFile: File;
  musicFile: File;
  photoFiles: File[];
  genreIds: number[];
}

export interface AddSongResponse {
  id: number;
  songName: string;
}

export async function getAllSongs(
  pageNumber: number,
  pageSize: number
): Promise<SongsResponse> {
  const token = await getAuthTokenFromServerCookies();

  try {
    const response = await client<Song[]>(
      `/api/songs?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
    console.error('Error in getAllSongs:', error);
    throw error;
  }
}

// Only Artist can Add Songs
export async function addSong(
  payload: AddSongPayload
): Promise<AddSongResponse> {
  const token = await getAuthTokenFromServerCookies();

  try {
    const formData = new FormData();
    formData.append('songName', payload.songName);
    formData.append('description', payload.description);
    formData.append('lyricFile', payload.lyricFile);
    formData.append('musicFile', payload.musicFile);
    payload.photoFiles.forEach((file, index) =>
      formData.append(`photoFiles[${index}]`, file)
    );
    formData.append('genreIds', JSON.stringify(payload.genreIds));

    const response = await client<Song>('/api/songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.headers.get('Content-Type')?.includes('application/json')) {
      throw new Error('Response does not contain valid JSON data');
    }

    return {
      id: response.data.id,
      songName: response.data.songName,
    };
  } catch (error) {
    console.error('Error in addSong:', error);
    throw {
      success: false,
      message: 'Failed to add song',
    };
  }
}
