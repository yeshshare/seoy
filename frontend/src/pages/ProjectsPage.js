import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectsPage = () => {
  const [projetos, setProjetos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const response = await axios.get('/api/projetos');
        setProjetos(response.data);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      }
    };

    fetchProjetos();
  }, []);

  const handleCreateProject = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="projects-container">
      <button onClick={handleCreateProject}>Criar Novo Projeto</button>
      <ul>
        {projetos.map(projeto => (
          <li key={projeto.id}>
            {projeto.nome}
            {/* Adicionar opções de edição e exclusão */}
            <button onClick={() => {/* Função de edição */ }}>Editar</button>
            <button onClick={() => {/* Função de exclusão */ }}>Excluir</button>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Criar Novo Projeto</h2>
            <form>
              {/* Campos para criar um novo projeto */}
              <div className="form-group">
                <label>Nome do Projeto</label>
                <input type="text" name="nome" required />
              </div>
              <button type="submit">Salvar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
