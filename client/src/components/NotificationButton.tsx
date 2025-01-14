'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import NotificationItem from './NotificationItem';
import { Button } from './ui/button';
import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Notification } from '@/types/global';
import { getNotifications } from '@/actions/notify-actions';
import { useMarkReadNotifyMutation } from '@/hooks/useNotifyMutation';
import * as signalR from '@microsoft/signalr';

const NotificationButton: React.FC = () => {
  const { userDetails } = useUser();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const markReadNotifyMutation = useMarkReadNotifyMutation();

  const markAsRead = async (notificationId: number) => {
    await markReadNotifyMutation.mutateAsync(notificationId);
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) =>
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
  }

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getNotifications();
      console.log('data', data);
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    if (!userDetails?.id) {
      return;
    }

    const connection = new signalR.HubConnectionBuilder()
      .withUrl('/notifications') // Replace with your SignalR hub URL
      .withAutomaticReconnect()
      .build();

    connection.start().catch(err => console.error('SignalR Connection Error: ', err));

    connection.on('ReceiveNotification', (notification: Notification) => {
      setNotifications(prevNotifications => [notification, ...prevNotifications]);
    });

    return () => {
      connection.stop().catch(err => console.error('SignalR Disconnection Error: ', err));
    };
  }, [userDetails?.id]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className={`focus:outline-none hover:bg-opacity-70 rounded-full [&_svg]:size-[20px]
            ${notifications && notifications.some((n) => n.isRead) ? 'text-general-pink ' : 'bg-general-pink text-white'}`}
        >
          <Bell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end"
        className="border-none bg-zinc-800 text-general-pink-hover rounded-lg font-medium
             divide-y-2 divide-zinc-700"
      >
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`focus:bg-zinc-700 text-md rounded-none 
              ${notification.isRead ? 'text-white focus:text-white' : 'text-pink-600 focus:text-pink-600'}`}
            >
              <NotificationItem
                notification={notification}
                handleMarkRead={() => {
                  if (!notification.isRead) {
                    markAsRead(notification.id);
                  }
                }
                }
              />
            </DropdownMenuItem>
          ))
        ) : (
          <div className="text-white-500 p-4">You don&apos;t have any notifications!</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationButton;
