'server only';

import client from '@/services/client';
import { Notification } from '@/types/global';
import { getAuthTokenFromCookies } from './utils';


export interface CreateNotificationPayload {
   title: string;
   content: string;
   userId: number;
}

export async function getNotifications(): Promise<Notification[]> {
   const token = await getAuthTokenFromCookies();
   try {
      const response = await client<Notification[]>(`/api/notifications`, {
         method: 'GET',
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });

      return response.data;
   } catch (error) {
      console.error('Get notifications error: ', error);
      throw error;
   }
}

export async function markNotificationAsRead(notifyId: number): Promise<void> {
   const token = await getAuthTokenFromCookies();
   try {
      await client<void>(`/api/notifications/read/${notifyId}`, {
         method: 'PATCH',
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
   } catch (error) {
      console.error('Mark notification as read error: ', error);
      throw error;
   }
}

export async function CreateNotification(payload: CreateNotificationPayload): Promise<Notification> {
   const token = await getAuthTokenFromCookies();
   try {
      const response = await client<Notification>('/api/notifications', {
         method: 'POST',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(payload),
      });

      return response.data;
   } catch (error) {
      console.error('Create notification error: ', error);
      throw error;
   }
}