import React from 'react';
import AlertCard from './AlertCard';

const AlertComponent: React.FC = () => {
  const alertData = {
    location: 'Chalakudy',
    alerts: [
      {
        type: 'Lightning',
        icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/86a424072a43d6a8344cb5e2744b98d437c16896b391e55e495808957c2c607b?apiKey=064c7d1bc1bd4d4dbf906d36b5699d98&'
        
      }
    ]
  };
  

  return <AlertCard location={alertData.location} alerts={alertData.alerts} />;
};

export default AlertComponent;