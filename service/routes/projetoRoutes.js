import express from 'express';
import * as  projetoController from '../controllers/projetosController.js';

const router = express.Router();

router.get('/', projetoController.listarProjetos);
router.post('/', projetoController.criarProjeto);
router.get('/:id', projetoController.obterProjeto);
router.put('/:id', projetoController.atualizarProjeto);
router.delete('/:id', projetoController.excluirProjeto);

export default router;
