import * as movimentacaoService from '../services/movimentacaoService.js';

export const registrarMovimentacao = async (req, res) => {
    try {
        const { tipo, estoqueId, produtoId, quantidade, data } = req.body;
        const movimentacao = await movimentacaoService.registrarMovimentacao(tipo, estoqueId, produtoId, quantidade, data);
        res.status(201).json(movimentacao);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const listarMovimentacoes = async (req, res) => {
    try {
        const movimentacoes = await movimentacaoService.listarMovimentacoes();
        res.json(movimentacoes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


