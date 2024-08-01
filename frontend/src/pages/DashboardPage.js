import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <nav>
        <ul>
          <li><Link to="/estoques">Estoques</Link></li>
          <li><Link to="/entrada-saida">Entrada e Saída</Link></li>
          <li><Link to="/ordens">Ordens de Serviço</Link></li>
          <li><Link to="/projetos">Projetos</Link></li>
          <li><Link to="/relatorios">Relatórios</Link></li>
        </ul>
      </nav>
      <div className="dashboard-summary">
        {/* Painéis resumo aqui */}
      </div>
    </div>
  );
};

export default DashboardPage;
