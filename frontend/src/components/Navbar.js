import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const Navbar = () => {
    const { authState, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/dashboard">MyApp</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/users">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/estoques">Estoques</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/entrada-saida">Entrada e Saída</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/ordens">Ordens</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/projetos">Projetos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/relatorios">Relatórios</Link>
                    </li>
                </ul>
                {authState.isAuthenticated && (
                    <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
