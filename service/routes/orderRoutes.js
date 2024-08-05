import express from 'express';
import * as orderController from '../controllers/orderController.js';

const router = express.Router();

router.get('/', orderController.listOrders);
router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

export default router;
