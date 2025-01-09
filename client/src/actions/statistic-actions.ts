import client from "@/services/client";
import { getAuthTokenFromCookies } from "./utils";

export interface StatisticResponse {
  totalUsers: number;
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalPlaylists: number;
  totalGenres: number;
}

export async function getStatistic(): Promise<StatisticResponse> {
  const token = await getAuthTokenFromCookies();
  
  try {
    const response = await client<StatisticResponse>('/api/statistic/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.headers.get('Content-Type')?.includes('application/json')) {
      throw new Error('Response does not contain valid JSON data');
    }

    const data: StatisticResponse = response.data;
    if (!data) {
      throw new Error('Failed to fetch statistic data');
    }

    return data;
  } catch (error) {
    console.error('Error in getStatistic:', error);
    throw error;
  }
}
