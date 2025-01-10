'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { MdOutlineNotifications } from 'react-icons/md';
import NotificationItem from './NotificationItem';

interface Notification {
  id: number;
  message: string;
  status: 'success' | 'error'; // success: green check, error: red cross
}

const NotificationButton: React.FC = () => {
  const router = useRouter();
  const { userDetails } = useUser();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
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
        status: 'success',
      },
      {
        id: 2,
        message: 'Your song: "Legend always die" rejected by admin',
        status: 'error',
      },
      {
        id: 3,
        message: 'Your album: "Welcome to noxus" confirmed by admin',
        status: 'success',
      },
      {
        id: 4,
        message: 'Your album: "Welcome to toilet" rejected by admin',
        status: 'error',
      },
      {
        id: 5,
        message: 'Your account has been locked by admin',
        status: 'error',
      },
      { id: 6, message: 'Your account has been confirmed', status: 'success' },
    ]);
  }, [userDetails?.id]);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown}>
        <div className="flex rounded-full bg-general-pink hover:text-general-pink-hover transition-colors duration-200 w-8 h-8 items-center justify-center ml-2">
          <MdOutlineNotifications size="24" className="text-white" />
        </div>
      </button>
      {isDropdownVisible && (
        <div className="absolute right-0 mt-2 w-80 bg-pink-500 text-white rounded-lg shadow-lg z-10">
          <ul className="">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
