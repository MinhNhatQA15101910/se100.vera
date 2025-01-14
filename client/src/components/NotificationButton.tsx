'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

interface Notification {
  id: number;
  message: string;
  readStatus: boolean;
  status: 'success' | 'error'; // success: green check, error: red cross
}

const NotificationButton: React.FC = () => {
  const router = useRouter();
  const { userDetails } = useUser();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!userDetails?.id) {
      return;
    }
    // Fetch notifications (mock example, replace with API call)
    setNotifications([
      {
        id: 1,
        message: 'Your song: "Legend never die" confirmed by admin',
        readStatus: false,
        status: 'success',
      },
      {
        id: 2,
        message: 'Your song: "Legend always die" rejected by admin',
        readStatus: true,
        status: 'error',
      },
      {
        id: 3,
        message: 'Your album: "Welcome to noxus" confirmed by admin',
        readStatus: false,
        status: 'success',
      },
      {
        id: 4,
        message: 'Your album: "Welcome to toilet" rejected by admin',
        readStatus: true,
        status: 'error',
      },
      {
        id: 5,
        message: 'Your account has been locked by admin',
        readStatus: true,
        status: 'error',
      },
      {
        id: 6, message: 'Your account has been confirmed',
        readStatus: false,
        status: 'success'
      },
    ]);
  }, [userDetails?.id]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="focus:outline-none rounded-full [&_svg]:size-[20px]"
        >
          <Bell className="text-general-pink" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end"
        className="border-none bg-zinc-800 text-general-pink-hover rounded-lg font-medium
             divide-y-2 divide-zinc-700"
      >
        {notifications.map((notification) => (
          <DropdownMenuItem
            key={notification.id}
            className={`focus:bg-zinc-700 text-md rounded-none 
              ${notification.status === 'success' ? 'text-green-500 focus:text-green-500' : 'text-red-500 focus:text-red-500'}`}
          >
            <NotificationItem
              notification={notification}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationButton;