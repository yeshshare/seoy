import * as estoqueModel from '../models/estoque.js';

export const listarEstoques = async () => {
    return estoqueModel.listarEstoques();
};

export const adicionarEstoque = async (dadosEstoque) => {
    const { nome, endereco, temEndereco } = dadosEstoque;
    return estoqueModel.criarEstoque(nome, endereco, temEndereco);
};

export const obterEstoque = async (id) => {
    return estoqueModel.obterEstoquePorId(id);
};

export const atualizarEstoque = async (id, dadosEstoque) => {
    const { nome, endereco, temEndereco } = dadosEstoque;
    return estoqueModel.atualizarEstoque(id, nome, endereco, temEndereco);
};

export const removerEstoque = async (id) => {
    return estoqueModel.excluirEstoque(id);
};