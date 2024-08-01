import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceOrdersPage = () => {
  const [ordens, setOrdens] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchOrdens = async () => {
      try {
        const response = await axios.get('/api/ordens');
        setOrdens(response.data);
      } catch (error) {
        console.error('Erro ao buscar ordens:', error);
      }
    };

    fetchOrdens();
  }, []);

  const handleCreateOrder = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="service-orders-container">
      <button onClick={handleCreateOrder}>Criar Nova Ordem</button>
      <ul>
        {ordens.map(ordem => (
          <li key={ordem.id}>
            {ordem.clienteId} - {ordem.projetoId}
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
            <h2>Criar Nova Ordem</h2>
            <form>
              {/* Campos para criar uma nova ordem */}
              <div className="form-group">
                <label>Cliente ID</label>
                <input type="text" name="clienteId" required />
              </div>
              <div className="form-group">
                <label>Projeto ID</label>
                <input type="text" name="projetoId" required />
              </div>
              <button type="submit">Salvar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceOrdersPage;
