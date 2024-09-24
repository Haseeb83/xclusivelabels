// src/modules/dashboard/Dashboard.tsx
import React from 'react';
import Notification from '@client/components/common/Notifications';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Notification />
      {/* Other dashboard components */}
    </div>
  );
};

export default Dashboard;
