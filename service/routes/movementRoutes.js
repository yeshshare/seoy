import express from 'express';
import * as movimentacaoController from '../controllers/movementController.js';

const router = express.Router();

router.post('/entrada', movimentacaoController.registerMovement);
router.post('/saida', movimentacaoController.registerMovement);
router.get('/', movimentacaoController.listMovements);

export default router;
