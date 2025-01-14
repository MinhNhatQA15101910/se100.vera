'use client';

import { Notification } from '@/types/global';
import { CircleCheck, CircleDot, CircleX } from 'lucide-react';
import React from 'react';

interface NotificationItemProps {
  notification: Notification;
  handleMarkRead?: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  handleMarkRead,
}) => {
  return (
    <div
      onClick={handleMarkRead}
      className={`flex flex-row w-full h-full items-center p-2`}
    >
      <div className='mr-2'>
        {notification.type.includes('Approved') || notification.type.includes('Commented')
          ? <CircleCheck fill="#86efac" size="30px" className='text-green-700' />
          : <CircleX fill="#ef4444" size="30px" className='text-red-700' />}
      </div>
      <div className='flex flex-col text'>
        <p className='font-medium'>{notification.title}</p>
        <p className='font-normal'>{notification.content}</p>
      </div>
      {notification.isRead
        ? <CircleDot size="10px" className='ml-auto invisible' />
        : <CircleDot fill="#f342c4" size="10px" className='ml-4 stroke-[3px] text-general-pink-hover' />
      }
    </div>
  );
};

export default NotificationItem;
