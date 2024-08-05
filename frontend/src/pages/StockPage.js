import React, { useState, useEffect } from 'react';
import api from '../services/apiService';


const StockPage = () => {
  const [stocks, setStocks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [currentStockId, setCurrentStockId] = useState(null); // Para armazenar o ID do estoque atual

  useEffect(() => {
    fetchStocks(); // Chama a função para buscar os estoques quando o componente é montado
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await api.get('/api/stocks');
      setStocks(response.data);
    } catch (error) {
      console.error('Erro ao buscar estoques:', error);
    }
  };

  const handleCreateStock = () => {
    setName('');
    setCurrentStockId(null); // Limpa o ID atual
    setShowModal(true);
  };

  const handleEditStock = (stock) => {
    setName(stock.name);
    setCurrentStockId(stock.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentStockId) {
        // Atualizar estoque
        await api.put(`/api/stocks/${currentStockId}`, { name });
      } else {
        // Criar novo estoque
        await api.post('/api/stocks', { name });
      }
      fetchStocks(); // Atualiza a lista após a criação ou atualização
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao salvar estoque:', error);
    }
  };

  const handleDeleteStock = async (id) => {
    try {
      await api.delete(`/api/stocks/${id}`);
      fetchStocks(); // Atualiza a lista após a exclusão
    } catch (error) {
      console.error('Erro ao excluir estoque:', error);
    }
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-primary mb-3" onClick={handleCreateStock}>
        Criar Novo Estoque
      </button>
      <ul className="list-group">
        {stocks.map((stock) => (
          <li key={stock.id} className="list-group-item d-flex justify-content-between align-items-center">
            {stock.name}
            <div>
              <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEditStock(stock)}>
                Editar
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteStock(stock.id)}>
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
                <h5 className="modal-title">{currentStockId ? 'Editar Estoque' : 'Criar Novo Estoque'}</h5>
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
                      placeholder="Nome do Estoque"
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {currentStockId ? 'Atualizar' : 'Salvar'}
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

export default StockPage;
