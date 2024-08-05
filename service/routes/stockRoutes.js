import express from 'express';
import * as stockController from '../controllers/stockController.js';

const router = express.Router();

router.get('/', stockController.listStocks);
router.post('/', stockController.createStock);
router.get('/:id', stockController.getStock);
router.put('/:id', stockController.updateStock);
router.delete('/:id', stockController.deleteStock);

export default router;