import express from 'express';
import * as EquipmentController from '../controllers/equipmentController.js';

const router = express.Router();

// Rota para listar equipamentos filtrados por categoria e subcategoria
router.get('/by-category/:categoryName/:subcategoryName', EquipmentController.getEquipmentsByCategoryAndSubcategory);

// Rota para obter um equipamento por ID
router.get('/:id', EquipmentController.getEquipmentById);

export default router;