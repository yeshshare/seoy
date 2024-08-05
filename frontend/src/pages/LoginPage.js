import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import './Login.css'; // Inclua o CSS específico

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { authState, login } = useAuth();

  // Verificar se o usuário já está autenticado
  useEffect(() => {
    console.log(`isAuthenticated : ${authState.isAuthenticated}`);
    if (authState.isAuthenticated) {
      navigate('/dashboard'); // Redireciona para o dashboard se o usuário já estiver autenticado
    }
  }, [authState.isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const isAuthenticated = await login(email, password);

    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card card p-4">
        <h1 className="text-center mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
          <div className="text-center mt-3">
            <a href="/forgot-password" className="text-muted">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
