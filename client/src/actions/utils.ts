'use server';

import { User } from '@/types/global';
import { cookies } from 'next/headers';

export async function getAuthTokenFromServerCookies(): Promise<string | null> {
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

export async function getUserFromServerCookies(): Promise<User | null> {
  try {
    const cookieStore = cookies();

    const userDetails = cookieStore.get('userDetails');

    if (!userDetails) {
      console.warn('userDetails cookie not found');
      return null;
    }

    try {
      const parsedUserDetails = JSON.parse(userDetails.value) as User;
      return parsedUserDetails;
    } catch (error) {
      console.error('Error parsing userDetails cookie:', error);
      return null;
    }
  } catch (error) {
    console.error('Error getting user details from cookies:', error);
    return null;
  }
}
