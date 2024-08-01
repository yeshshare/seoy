import React, { useState } from 'react';
import axios from 'axios';

const EntryExitPage = () => {
  const [movimentacao, setMovimentacao] = useState({ tipo: '', estoqueId: '', produtoId: '', quantidade: '', data: '' });
  const [movimentacoes, setMovimentacoes] = useState([]);

  const handleMovimentacao = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/movimentacoes/entrada', movimentacao);
      // Atualizar lista de movimentações
      setMovimentacoes([...movimentacoes, movimentacao]);
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
        <div className="form-group">
          <label>Estoque ID</label>
          <input
            type="text"
            value={movimentacao.estoqueId}
            onChange={(e) => setMovimentacao({ ...movimentacao, estoqueId: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Produto ID</label>
          <input
            type="text"
            value={movimentacao.produtoId}
            onChange={(e) => setMovimentacao({ ...movimentacao, produtoId: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Quantidade</label>
          <input
            type="number"
            value={movimentacao.quantidade}
            onChange={(e) => setMovimentacao({ ...movimentacao, quantidade: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Data</label>
          <input
            type="date"
            value={movimentacao.data}
            onChange={(e) => setMovimentacao({ ...movimentacao, data: e.target.value })}
          />
        </div>
        <button type="submit">Registrar Movimentação</button>
      </form>
      <ul>
        {movimentacoes.map((mov, index) => (
          <li key={index}>{`Tipo: ${mov.tipo}, Estoque ID: ${mov.estoqueId}, Produto ID: ${mov.produtoId}, Quantidade: ${mov.quantidade}, Data: ${mov.data}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default EntryExitPage;
