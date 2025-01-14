'server only';

import { Song } from '@/types/global';
import client from '@/services/client';

import { getAuthTokenFromCookies } from './utils';
import { downloadSong } from '@/lib/utils';

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
  pageNumber?: number,
  pageSize?: number,
  keyword?: string,
  sortBy?: string,
  sortOrder?: string
): Promise<SongsResponse> {
  const token = await getAuthTokenFromCookies();

  try {
    // Construct the query string with the sorting parameters
    const queryParams: string[] = [];
    if (pageNumber) queryParams.push(`pageNumber=${pageNumber}`);
    if (pageSize) queryParams.push(`pageSize=${pageSize}`);
    if (keyword) queryParams.push(`keyword=${keyword}`);
    if (sortBy) queryParams.push(`orderBy=${sortBy}`);
    if (sortOrder) queryParams.push(`sortBy=${sortOrder}`);

    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

    const response = await client<Song[]>(`/api/songs${queryString}`, {
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

export async function approveSong(songId: number): Promise<void> {
  const token = await getAuthTokenFromCookies();

  try {
    await client(`/api/songs/approve/${songId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error approving the song: ', error);
    throw error;
  }
}

export async function rejectSong(songId: number): Promise<void> {
  const token = await getAuthTokenFromCookies();

  try {
    await client(`/api/songs/reject/${songId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error rejecting the song: ', error);
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

export async function getArtistSongsByArtistId(artistId: number) {
  const token = getAuthTokenFromCookies();
  try {
    const response = await client<Song[]>(
      `/api/songs?&publisherId=${artistId}`,

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
    console.error('Error in getAllSongs for Artist:', error);
    throw error;
  }
}

export async function getFavoriteSongs({
  pageNumber,
  pageSize,
}: {
  pageNumber: number;
  pageSize: number;
}) {
  const token = await getAuthTokenFromCookies();

  try {
    const response = await client<Song[]>(
      `api/users/me/favorite-songs?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
    console.error('Error in get Favourite songs:', error);
    throw error;
  }
}

export async function isFavoriteSong(songId: number): Promise<boolean> {
  const token = await getAuthTokenFromCookies();

  try {
    const response = await client<boolean>(`/api/songs/is-favorite/${songId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error in checking Favourite song:', error);
    throw error;
  }
}

export async function toggleFavoriteSongById(songId: number): Promise<void> {
  const token = await getAuthTokenFromCookies();

  try {
    await client(`/api/songs/toggle-favorite/${songId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error in toggling favorite song:', error);
    throw error;
  }
}

export async function downloadSongById(songId: number, url: string, fileName: string) {
  const token = await getAuthTokenFromCookies();

  try {
    const response = await client(`/api/songs/download/${songId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    downloadMp3FromUrl(url, fileName);

  } catch (error) {
    console.error('Error in downloading song:', error);
    throw error;
  }
}

export async function downloadMp3FromUrl(url: string, fileName: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const blob = await response.blob();
    downloadSong(fileName, blob, 'audio/mpeg');
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}
