import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import StockPage from './pages/StockPage';
import EntryExitPage from './pages/EntryExitPage';
import ServiceOrdersPage from './pages/ServiceOrdersPage';
import ProjectsPage from './pages/ProjectsPage';
import ReportsPage from './pages/ReportsPage';
import { AuthProvider, useAuth } from './contexts/authContext';
import Layout from './components/Layout'; // Certifique-se de que o Layout está sendo importado
import './App.css';
import UserPage from './pages/UserPage';

// Componente de rota protegida
const ProtectedRoute = ({ element }) => {
  const { authState } = useAuth();
  console.log('ProtectedRoute authState:', authState);

  return authState.isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Layout />}> {/* Incluindo o Layout */}
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<DashboardPage />} />}
            />
            <Route
              path="/estoques"
              element={<ProtectedRoute element={<StockPage />} />}
            />
            <Route
              path="/entrada-saida"
              element={<ProtectedRoute element={<EntryExitPage />} />}
            />
            <Route
              path="/ordens"
              element={<ProtectedRoute element={<ServiceOrdersPage />} />}
            />
            <Route
              path="/projetos"
              element={<ProtectedRoute element={<ProjectsPage />} />}
            />
            <Route
              path="/relatorios"
              element={<ProtectedRoute element={<ReportsPage />} />}
            />
            <Route
              path="/users"
              element={<ProtectedRoute element={<UserPage />} />}
            />

            <Route path="/" element={<Navigate to="/login" />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
