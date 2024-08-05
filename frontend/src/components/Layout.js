import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Importa o Navbar

const Layout = () => {
    return (
        <div className="layout">
            <Navbar /> {/* Inclui o Navbar */}
            <main className="main-content">
                <Outlet /> {/* Renderiza os componentes filhos */}
            </main>
            <footer className="footer">
                <p>&copy; 2024 Seu Projeto</p>
            </footer>
        </div>
    );
};

export default Layout;
