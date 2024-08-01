import * as estoqueService from '../services/estoqueService';

export const listarEstoques = async (req, res, next) => {
    try {
        const estoques = await estoqueService.listarEstoques();
        res.json(estoques);
    } catch (erro) {
        next(erro);
    }
};

export const criarEstoque = async (req, res, next) => {
    try {
        const estoqueId = await estoqueService.adicionarEstoque(req.body);
        res.status(201).json({ id: estoqueId });
    } catch (erro) {
        next(erro);
    }
};

export const obterEstoque = async (req, res, next) => {
    try {
        const estoque = await estoqueService.obterEstoque(req.params.id);
        if (estoque) {
            res.json(estoque);
        } else {
            res.status(404).json({ mensagem: 'Estoque não encontrado' });
        }
    } catch (erro) {
        next(erro);
    }
};

export const atualizarEstoque = async (req, res, next) => {
    try {
        const alteracoes = await estoqueService.atualizarEstoque(req.params.id, req.body);
        res.json({ alteracoes });
    } catch (erro) {
        next(erro);
    }
};

export const excluirEstoque = async (req, res, next) => {
    try {
        const alteracoes = await estoqueService.removerEstoque(req.params.id);
        res.json({ alteracoes });
    } catch (erro) {
        next(erro);
    }
};
