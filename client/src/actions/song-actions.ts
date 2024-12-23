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

  console.log('Token from server:', token);

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

    console.log('Fetched Responses: ', response);
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    const paginationHeader = response.headers.get('Pagination');
    if (!paginationHeader) {
      console.warn('Headers from server:', response.headers);
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
