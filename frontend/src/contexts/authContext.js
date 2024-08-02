import React, { createContext, useState, useContext } from 'react';
import api from '../services/apiService'; // Importa a instância da API

// Cria o contexto de autenticação
const AuthContext = createContext();

// Provedor do contexto de autenticação
export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ isAuthenticated: false, user: null });

    const login = async (email, password) => {
        try {
            const response = await api.post('/api/usuarios/login', { email, senha: password });

            if (response.status === 200) {
                setAuthState({ isAuthenticated: true, user: { email } });
                return true; // Retorna verdadeiro se o login for bem-sucedido
            } else {
                console.error('Login failed:', response.data.message || 'Unknown error');
                return false; // Retorna falso se o login falhar
            }
        } catch (error) {
            console.error('Error during login:', error);
            return false; // Retorna falso em caso de erro
        }
    };

    const logout = () => {
        setAuthState({ isAuthenticated: false, user: null });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar o contexto
export const useAuth = () => {
    return useContext(AuthContext);
};
