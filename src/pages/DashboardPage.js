// DashboardPage.js
import React from 'react';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
  return (
    <div>
      <div className="navbar"><h2 style={{height: '30px' }}>Dashboard</h2></div>
      
      <Dashboard/>
    </div>
  );
};

export default DashboardPage;
