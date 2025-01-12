'use client';

import { CircleCheck, CircleDot, CircleX } from 'lucide-react';
import React from 'react';

interface Notification {
  id: number;
  message: string;
  readStatus: boolean;
  status: 'success' | 'error';
}

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  return (
    <div className={`flex flex-row w-full h-full items-center p-2`}>
      <div className='mr-2'>
        {notification.status === "success"
          ? <CircleCheck fill="#86efac" size="30px" className='text-green-700' />
          : <CircleX fill="#ef4444" size="30px" className='text-red-700' />}
      </div>
      {notification.message}
      {notification.readStatus
        ? <CircleDot fill="#f342c4" size="10px" className='ml-auto stroke-[3px] text-general-pink-hover' />
        : <CircleDot size="10px" className='ml-auto invisible' />
      }
    </div>
  );
};

export default NotificationItem;
