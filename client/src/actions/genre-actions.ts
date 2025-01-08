'server only';

import client from '@/services/client';
import { Genre } from '@/types/global';
import { getAuthTokenFromCookies } from './utils';


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

export async function getAllGenres({
  pageSize,
}: {
  pageSize: number;
}): Promise<Genre[]> {
  try {
    const response = await client<Genre[]>(`/api/genres?pageSize=${pageSize}`, {
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    console.error('Fetch Genre Errors: ', error);
    throw error;
  }
}

export async function addGenre(formData: FormData): Promise<AddGenreResponse> {
  const token = await getAuthTokenFromCookies();

  try {
    const response = await client<Genre>('/api/genres', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
  genreId: number,
  formData: FormData
): Promise<void> {
  const token = await getAuthTokenFromCookies();

  try {
    await client(`/api/songs/${genreId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
