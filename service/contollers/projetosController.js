import projetoService from '../services/projetoService.js';

const listarProjetos = async (req, res) => {
    try {
        const projetos = await projetoService.listarProjetos();
        res.json(projetos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const criarProjeto = async (req, res) => {
    try {
        const novoProjeto = await projetoService.criarProjeto(req.body);
        res.status(201).json(novoProjeto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const obterProjeto = async (req, res) => {
    try {
        const projeto = await projetoService.obterProjeto(req.params.id);
        res.json(projeto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const atualizarProjeto = async (req, res) => {
    try {
        const resultado = await projetoService.atualizarProjeto(req.params.id, req.body);
        res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const excluirProjeto = async (req, res) => {
    try {
        const resultado = await projetoService.excluirProjeto(req.params.id);
        res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export {
    listarProjetos,
    criarProjeto,
    obterProjeto,
    atualizarProjeto,
    excluirProjeto
};
