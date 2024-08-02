import React from 'react';
import Navbar from '../components/Navbar';

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-summary">
        {/* Painéis resumo aqui */}
      </div>
    </div>
  );
};

export default DashboardPage;
