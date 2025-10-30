import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Content />
      </div>
    </div>
  );
};

export default Dashboard;
