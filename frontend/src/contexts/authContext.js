import React, { createContext, useState, useContext } from 'react';
import api from '../services/apiService'; // Importe a instância do Axios

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ isAuthenticated: null, user: null });

    const login = async (email, password) => {
        try {
            const response = await api.post('/api/users/login', { email, password });
            if (response.status === 200) {
                const userData = response.data;
                setAuthState({ isAuthenticated: true, user: userData });
                return true;
            } else {
                setAuthState({ isAuthenticated: false, user: null });
                return false;
            }
        } catch (error) {
            console.error('Login error:', error);
            setAuthState({ isAuthenticated: false, user: null });
            return false;
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

export const useAuth = () => useContext(AuthContext);
