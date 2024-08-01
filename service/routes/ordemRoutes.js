import express from 'express';
import * as ordemController from '../controllers/ordemController.js';

const router = express.Router();

router.get('/', ordemController.listarOrdens);
router.post('/', ordemController.criarOrdem);
router.get('/:id', ordemController.obterOrdem);
router.put('/:id', ordemController.atualizarOrdem);
router.delete('/:id', ordemController.excluirOrdem);

export default router;
