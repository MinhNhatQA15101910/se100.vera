'server only';

import client from '@/services/client';
import { getAuthTokenFromCookies } from './utils';
import { User } from '@/types/global';

export interface ArtistsReponse {
  artist: User[];
}

export async function getAllAritst(): Promise<ArtistsReponse> {
  const token = await getAuthTokenFromCookies();

  try {
    const response = await client<User[]>('/api/users/artists', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      artist: response.data,
    };
  } catch (error) {
    console.error('Get all Artists: ', error);
    throw error;
  }
}