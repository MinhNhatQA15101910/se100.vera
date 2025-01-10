'use client';

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
    <li className={`flex items-center p-2 border border-white`}>
      <span className="mr-2">
        {notification.status === 'success' ? '✅' : '❌'}
      </span>
      {notification.message}
    </li>
  );
};

export default NotificationItem;
