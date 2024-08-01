import express from 'express';
import * as movimentacaoController from '../controllers/movimentacaoController.js';

const router = express.Router();

router.post('/entrada', movimentacaoController.registrarMovimentacao);
router.post('/saida', movimentacaoController.registrarMovimentacao);
router.get('/', movimentacaoController.listarMovimentacoes);

export default router;
