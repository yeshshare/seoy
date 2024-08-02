// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import StockPage from './pages/StockPage';
import EntryExitPage from './pages/EntryExitPage';
import ServiceOrdersPage from './pages/ServiceOrdersPage';
import ProjectsPage from './pages/ProjectsPage';
import ReportsPage from './pages/ReportsPage';
import { useAuth } from './contexts/authContext';
import './App.css';

const App = () => {
  const { authState } = useAuth(); // Obtenha o estado de autenticação

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={authState.isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/dashboard"
          element={authState.isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/estoques"
          element={authState.isAuthenticated ? <StockPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/entrada-saida"
          element={authState.isAuthenticated ? <EntryExitPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/ordens"
          element={authState.isAuthenticated ? <ServiceOrdersPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/projetos"
          element={authState.isAuthenticated ? <ProjectsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/relatorios"
          element={authState.isAuthenticated ? <ReportsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={authState.isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;