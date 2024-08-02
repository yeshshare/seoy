import React from 'react';
import { Link } from 'react-router-dom';
//import './Navbar.css'; // Se precisar de estilos personalizados

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Dashboard</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/estoques">Estoques</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/entrada-saida">Entrada e Saída</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/ordens">Ordens de Serviço</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/projetos">Projetos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/relatorios">Relatórios</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
