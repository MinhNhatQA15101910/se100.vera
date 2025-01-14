'server only';

import client from '@/services/client';
import { getAuthTokenFromCookies } from './utils';
import { User } from '@/types/global';

export interface ArtistsReponse {
  artists: User[];
}

export interface ActivateArtistAccountProps {
  artistName: string;
  description: string;
}

export interface EditUserPayload {
  photoFile: File;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateUserPayload {
  firstName: string;
  lastName: string;
  artistName: string;
  gender: 'male' | 'female';
  about: string;
  photoFile: File;
  dateOfBirth: Date;
}

export async function getAllArtists(
  pageNumber?: number,
  pageSize?: number,
  keyword?: string
): Promise<{ artists: User[]; pagination: any }> {
  const token = await getAuthTokenFromCookies();

  try {
    let url = `/api/users/artists`;
    const params: string[] = [];

    if (pageNumber) params.push(`pageNumber=${pageNumber}`);
    if (pageSize) params.push(`pageSize=${pageSize}`);
    if (keyword) params.push(`keyword=${encodeURIComponent(keyword)}`);

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    const response = await client<User[]>(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const paginationHeader = response.headers.get('Pagination');
    if (!paginationHeader) {
      throw new Error('Pagination data not found in headers');
    }

    const pagination = JSON.parse(paginationHeader);

    if (!response.headers.get('Content-Type')?.includes('application/json')) {
      throw new Error('Response does not contain valid JSON data');
    }

    return {
      artists: response.data,
      pagination,
    };
  } catch (error) {
    console.error('Error in getAllArtists:', error);
    throw error;
  }
}


export async function activateArtistAccount(
  artistName: string,
  description: string
) {
  const token = await getAuthTokenFromCookies();
  try {
    await client<User[]>('/api/users/activate-artist', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        artistName: artistName,
        description: description,
      }),
    });
  } catch (error) {
    console.error('Error in activate Artists: ', error);
    throw error;
  }
}

export async function uploadUserPhoto(formData: FormData) {
  const token = await getAuthTokenFromCookies();

  try {
    await client(`/api/users/add-photo`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  } catch (error) {
    console.error('Error in upload photo: ', error);
    throw error;
  }
}

export async function changePassword(data: ChangePasswordPayload) {
  const token = await getAuthTokenFromCookies();

  try {
    await client(`/api/users/change-password`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }),
    });
  } catch (error) {
    console.error('Error changing a user password: ', error);
    throw error;
  }
}

export async function updateUser(data: FormData) {
  const token = await getAuthTokenFromCookies();

  try {
    await client(`/api/users`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
  } catch (error) {
    console.error('Error update user: ', error);
    throw error;
  }
}

export async function getUserById(userId: number): Promise<User> {
  const token = await getAuthTokenFromCookies();

  try {
    const response = await client<User>(`/api/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Get User by id errro: ', error);
    throw error;
  }
}

export async function toggleUserLock(userId: number): Promise<void> {
  const token = await getAuthTokenFromCookies();

  try {
    await client(`/api/users/toggle-lock/${userId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error toggling user lock state: ', error);
    throw error;
  }
}
