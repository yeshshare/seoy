import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockPage = () => {
  const [estoques, setEstoques] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchEstoques = async () => {
      try {
        const response = await axios.get('/api/estoques');
        setEstoques(response.data);
      } catch (error) {
        console.error('Erro ao buscar estoques:', error);
      }
    };

    fetchEstoques();
  }, []);

  const handleCreateStock = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="stock-container">
      <button onClick={handleCreateStock}>Criar Novo Estoque</button>
      <ul>
        {estoques.map(estoque => (
          <li key={estoque.id}>
            {estoque.nome}
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
            <h2>Criar Novo Estoque</h2>
            <form>
              {/* Campos para criar um novo estoque */}
              <div className="form-group">
                <label>Nome do Estoque</label>
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

export default StockPage;
