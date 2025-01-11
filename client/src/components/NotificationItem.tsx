'use client';

import { Check, CircleCheck, CircleX } from 'lucide-react';
import React from 'react';

interface Notification {
  id: number;
  message: string;
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
          ? <CircleCheck className='text-green-500' />
          : <CircleX className='text-red-500' />}
      </div>
      {notification.message}
    </div>
  );
};

export default NotificationItem;
