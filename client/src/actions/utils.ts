'use server';

import { cookies } from 'next/headers';

export async function getAuthTokenFromCookies(): Promise<string | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token');

    if (!token) {
      console.warn('[getAuthTokenFromCookies] auth_token cookie not found');
      return null;
    }

    // Validate JWT format
    const parts = token.value.split('.');
    if (parts.length !== 3) {
      console.warn(
        '[getAuthTokenFromCookies] Invalid JWT format in auth_token cookie'
      );
      return null;
    }

    return token.value;
  } catch (error) {
    console.error(
      '[getAuthTokenFromCookies] Error retrieving auth token:',
      error
    );
    return null;
  }
}
