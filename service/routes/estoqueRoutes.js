import express from 'express';
import * as estoqueController from '../controllers/estoqueController.js';

const router = express.Router();

router.get('/', estoqueController.listarEstoques);
router.post('/', estoqueController.criarEstoque);
router.get('/:id', estoqueController.obterEstoque);
router.put('/:id', estoqueController.atualizarEstoque);
router.delete('/:id', estoqueController.excluirEstoque);

export default router;
