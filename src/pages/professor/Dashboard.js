import React from 'react';
import preventUnauth from '../../hooks/preventUnauth';

const Dashboard = () => {
  preventUnauth();

  return <div style={{ height: '100%' }}>Dashboard</div>;
};

export default Dashboard;
