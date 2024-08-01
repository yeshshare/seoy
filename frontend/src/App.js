import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import StockPage from './pages/StockPage';
import EntryExitPage from './pages/EntryExitPage';
import ServiceOrdersPage from './pages/ServiceOrdersPage';
import ProjectsPage from './pages/ProjectsPage';
import ReportsPage from './pages/ReportsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/estoques" element={<StockPage />} />
        <Route path="/entrada-saida" element={<EntryExitPage />} />
        <Route path="/ordens" element={<ServiceOrdersPage />} />
        <Route path="/projetos" element={<ProjectsPage />} />
        <Route path="/relatorios" element={<ReportsPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
