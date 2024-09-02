// src/components/common/Notification.tsx
import React from 'react';
import { useNotifications } from '@client/contexts/Notificationcontext';

const Notification: React.FC = () => {
  const { notifications } = useNotifications();

  return (
    <div className="notifications">
      {notifications.map((notification) => (
        <div key={notification.id} className="notification">
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
