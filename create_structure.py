import os

# Função para criar pastas e arquivos
def create_structure(base_dir, structure):
    for name, value in structure.items():
        path = os.path.join(base_dir, name)
        
        if isinstance(value, dict):
            # Cria o diretório
            if not os.path.exists(path):
                os.makedirs(path)
            # Cria a estrutura dentro do diretório
            create_structure(path, value)
        else:
            # Cria o arquivo
            with open(path, 'w') as file:
                file.write(value)

# Estrutura de pastas e arquivos
structure = {
    'src': {
        'components': {
            'Header.js': '// Componente Header\n',
            'Footer.js': '// Componente Footer\n',
        },
        'pages': {
            'LoginPage.js': """import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/login', { email, password });
      history.push('/dashboard');
    } catch (error) {
      console.error(error);
      // Exibir mensagem de erro
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
        <div>
          <a href="/forgot-password">Forgot Password?</a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;""",
            'DashboardPage.js': """import React from 'react';
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

export default DashboardPage;""",
            'StockPage.js': """import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockPage = () => {
  const [estoques, setEstoques] = useState([]);

  useEffect(() => {
    const fetchEstoques = async () => {
      const response = await axios.get('/api/estoques');
      setEstoques(response.data);
    };

    fetchEstoques();
  }, []);

  return (
    <div className="stock-container">
      <button onClick={() => {/* Abrir modal para criar novo estoque */}}>Criar Novo Estoque</button>
      <ul>
        {estoques.map(estoque => (
          <li key={estoque.id}>
            {estoque.nome}
            {/* Adicionar opções de edição e exclusão */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockPage;""",
            'EntryExitPage.js': """import React, { useState } from 'react';
import axios from 'axios';

const EntryExitPage = () => {
  const [movimentacao, setMovimentacao] = useState({ tipo: '', estoqueId: '', produtoId: '', quantidade: '', data: '' });
  const [movimentacoes, setMovimentacoes] = useState([]);

  const handleMovimentacao = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/movimentacoes/entrada', movimentacao);
      // Atualizar lista de movimentações
    } catch (error) {
      console.error(error);
      // Exibir mensagem de erro
    }
  };

  return (
    <div className="entry-exit-container">
      <form onSubmit={handleMovimentacao}>
        <div className="form-group">
          <label>Tipo</label>
          <select value={movimentacao.tipo} onChange={(e) => setMovimentacao({ ...movimentacao, tipo: e.target.value })}>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
        </div>
        {/* Adicionar campos para estoqueId, produtoId, quantidade e data */}
        <button type="submit">Registrar Movimentação</button>
      </form>
      <ul>
        {movimentacoes.map(mov => (
          <li key={mov.id}>{/* Detalhes da movimentação */}</li>
        ))}
      </ul>
    </div>
  );
};

export default EntryExitPage;""",
            'ServiceOrdersPage.js': """import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceOrdersPage = () => {
  const [ordens, setOrdens] = useState([]);

  useEffect(() => {
    const fetchOrdens = async () => {
      const response = await axios.get('/api/ordens');
      setOrdens(response.data);
    };

    fetchOrdens();
  }, []);

  return (
    <div className="service-orders-container">
      <button onClick={() => {/* Abrir modal para criar nova ordem */}}>Criar Nova Ordem</button>
      <ul>
        {ordens.map(ordem => (
          <li key={ordem.id}>
            {ordem.clienteId} - {ordem.projetoId}
            {/* Adicionar opções de edição e exclusão */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceOrdersPage;""",
            'ProjectsPage.js': """import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectsPage = () => {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    const fetchProjetos = async () => {
      const response = await axios.get('/api/projetos');
      setProjetos(response.data);
    };

    fetchProjetos();
  }, []);

  return (
    <div className="projects-container">
      <button onClick={() => {/* Abrir modal para criar novo projeto */}}>Criar Novo Projeto</button>
      <ul>
        {projetos.map(projeto => (
          <li key={projeto.id}>
            {projeto.nome}
            {/* Adicionar opções de edição e exclusão */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsPage;""",
            'ReportsPage.js': """import React from 'react';

const ReportsPage = () => {
  return (
    <div className="reports-container">
      <h2>Relatórios</h2>
      <div>
        <h3>Estoque</h3>
        {/* Adicionar relatórios de estoque */}
      </div>
      <div>
        <h3>Ordens de Serviço</h3>
        {/* Adicionar relatórios de ordens de serviço */}
      </div>
      <div>
        <h3>Projetos</h3>
        {/* Adicionar relatórios de projetos */}
      </div>
      {/* Adicionar filtros e opções de exportação */}
    </div>
  );
};

export default ReportsPage;""",
        },
        'services': {
            'apiService.js': """import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export default api;""",
        },
        'utils': {
            'helpers.js': '// Funções auxiliares e utilitários\n',
        },
        'App.js': """import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/estoques" component={StockPage} />
        <Route path="/entrada-saida" component={EntryExitPage} />
        <Route path="/ordens" component={ServiceOrdersPage} />
        <Route path="/projetos" component={ProjectsPage} />
        <Route path="/relatorios" component={ReportsPage} />
        <Route path="/" exact component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default App;""",
        'index.js': """import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));""",
        'index.css': """body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
.login-container, .dashboard-container, .stock-container, .entry-exit-container, .service-orders-container, .projects-container, .reports-container {
  padding: 20px;
}
h1, h2, h3 {
  color: #333;
}""",
    },
    'public': {
        'index.html': """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React App</title>
</head>
<body>
  <div id="root"></div>
  <script src="/static/js/bundle.js"></script>
</body>
</html>""",
    },
    'README.md': """# Meu Projeto React

Este é um projeto React criado com a estrutura básica para um sistema de gerenciamento de estoque.

## Estrutura

- `src/`: Código-fonte da aplicação.
  - `components/`: Componentes reutilizáveis.
  - `pages/`: Páginas da aplicação.
  - `services/`: Serviços para chamadas API.
  - `utils/`: Funções auxiliares e utilitários.
- `public/`: Arquivo HTML principal.
- `index.js`: Arquivo de entrada.
- `index.css`: Estilos globais.

## Instalação

1. Clone o repositório.
2. Execute `npm install` para instalar as dependências.
3. Execute `npm start` para iniciar a aplicação.

## Licença

Este projeto está licenciado sob a MIT License.
""",
}

# Diretório base onde a estrutura será criada
base_dir = 'frontend'

# Cria a estrutura
create_structure(base_dir, structure)
