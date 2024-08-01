import ordemService from '../services/ordemService.js';

export const listarOrdens = async (req, res) => {
    try {
        const ordens = await ordemService.listarOrdens();
        res.json(ordens);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const criarOrdem = async (req, res) => {
    try {
        const novaOrdem = await ordemService.criarOrdem(req.body);
        res.status(201).json(novaOrdem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const obterOrdem = async (req, res) => {
    try {
        const ordem = await ordemService.obterOrdem(req.params.id);
        res.json(ordem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const atualizarOrdem = async (req, res) => {
    try {
        const resultado = await ordemService.atualizarOrdem(req.params.id, req.body);
        res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const excluirOrdem = async (req, res) => {
    try {
        const resultado = await ordemService.excluirOrdem(req.params.id);
        res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

