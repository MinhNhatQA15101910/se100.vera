'use server';

import { cookies } from 'next/headers';

export async function getAuthTokenFromCookies(): Promise<string | null> {
  try {
    const cookieStore = cookies();

    const token = cookieStore.get('auth_token');
    if (!token) {
      console.warn('auth_token cookie not found');
      return null;
    }

    // Kiểm tra tính hợp lệ của JWT
    if (!token.value.includes('.')) {
      console.warn('Invalid JWT format in auth_token cookie');
      return null;
    }

    return token.value;
  } catch (error) {
    console.error('Error getting auth token from cookies:', error);
    return null;
  }
}
