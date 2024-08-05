import React, { useState, useEffect } from 'react';
import api from '../services/apiService';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [currentProjectId, setCurrentProjectId] = useState(null);

  useEffect(() => {
    fetchProjects(); // Chama a função para buscar os projetos quando o componente é montado
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    }
  };

  const handleCreateProject = () => {
    setName('');
    setCurrentProjectId(null); // Limpa o ID atual
    setShowModal(true);
  };

  const handleEditProject = (project) => {
    setName(project.name);
    setCurrentProjectId(project.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentProjectId) {
        // Atualizar projeto
        await api.put(`/api/projects/${currentProjectId}`, { name });
      } else {
        // Criar novo projeto
        await api.post('/api/projects', { name });
      }
      fetchProjects(); // Atualiza a lista após a criação ou atualização
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await api.delete(`/api/projects/${id}`);
      fetchProjects(); // Atualiza a lista após a exclusão
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
    }
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-primary mb-3" onClick={handleCreateProject}>
        Criar Novo Projeto
      </button>
      <ul className="list-group">
        {projects.map((project) => (
          <li key={project.id} className="list-group-item d-flex justify-content-between align-items-center">
            {project.name}
            <div>
              <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEditProject(project)}>
                Editar
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProject(project.id)}>
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{currentProjectId ? 'Editar Projeto' : 'Criar Novo Projeto'}</h5>
                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Nome do Projeto"
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {currentProjectId ? 'Atualizar' : 'Salvar'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
