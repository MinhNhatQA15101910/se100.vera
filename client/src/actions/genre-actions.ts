'server only';

import client from '@/services/client';
import { Genre } from '@/types/global';
import { getAuthTokenFromCookies } from './utils';
import { json } from 'stream/consumers';

export interface GenreResponse {
  genres: Genre[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface AddGenreResponse {
  id: number;
  genreName: string;
}

export interface AddGenrePayload {
  genreName: string;
}

export interface UpdateGenrePayload {
  genreName: string;
}

export async function getAllGenresNopage(): Promise<GenreResponse> {
  const token = await getAuthTokenFromCookies();

  try {
    const response = await client<Genre[]>(
      `/api/genres`,

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
      genres: response.data,
      pagination,
    };
  } catch (error) {
    console.error('Error in getAllGenres:', error);
    throw error;
  }
}

export async function getAllGenres(
  pageNumber?: number,
  pageSize?: number
): Promise<GenreResponse> {
  const token = await getAuthTokenFromCookies();

  try {
    const response = await client<Genre[]>(
      !pageNumber || !pageSize
        ? `/api/genres`
        : `/api/genres?pageNumber=${pageNumber}&pageSize=${pageSize}`,

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
      genres: response.data,
      pagination,
    };
  } catch (error) {
    console.error('Error in getAllGenres:', error);
    throw error;
  }
}

export async function addGenre(genreName: string): Promise<AddGenreResponse> {
  const token = await getAuthTokenFromCookies(); // Retrieve auth token
  try {
    const response = await client<Genre>('/api/genres', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Ensure proper content type
      },
      body: JSON.stringify({ genreName: genreName }), // Pass correct JSON body
    });

    return {
      id: response.data.id,
      genreName: response.data.genreName,
    };
  } catch (error) {
    console.error('Error in addGenre:', error);
    throw error;
  }
}

export async function updateGenre(
  genreName: string,
  genreId: number
): Promise<void> {
  const token = await getAuthTokenFromCookies();

  try {
    await client(`/api/genres/${genreId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ genreName: genreName }),
    });
  } catch (error) {
    console.error('update a genre error: ', error);
    throw error;
  }
}

export async function deleteGenre(genreId: number): Promise<void> {
  const token = await getAuthTokenFromCookies();
  try {
    await client(`/api/songs/${genreId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('delete a genre error: ', error);
    throw error;
  }
}
