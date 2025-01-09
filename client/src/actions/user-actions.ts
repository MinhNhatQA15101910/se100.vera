'server only';

import client from '@/services/client';
import { getAuthTokenFromCookies } from './utils';
import { User } from '@/types/global';

export interface ArtistsReponse {
  artists: User[];
}

export interface ActivateArtistAccountProps {
  artistName: string,
  description: string
}

export async function getAllArtists(): Promise<ArtistsReponse> {
  const token = await getAuthTokenFromCookies();

  try {
    const response = await client<User[]>('/api/users/artists', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      artists: response.data,
    };
  } catch (error) {
    console.error('Get all Artists: ', error);
    throw error;
  }
}

export async function activateArtistAccount({}) {
  
}
