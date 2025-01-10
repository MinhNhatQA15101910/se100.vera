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

export async function getAllArtists(): Promise<User[]> {
  const token = await getAuthTokenFromCookies();

  try {
    const response = await client<User[]>('/api/users/artists', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Get all Artists: ', error);
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
