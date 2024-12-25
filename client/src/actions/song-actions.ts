'server only';

import { Song } from '@/types/global';
import client from '@/services/client';

import { getAuthTokenFromServerCookies } from './actions';

export interface SongResponse {
  songs: Song[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export async function getAllSongs(
  pageNumber: number,
  pageSize: number
): Promise<SongResponse> {
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

export const weeklyTopSongs: Song[] = [];
export const newReleaseSongs: Song[] = [];
