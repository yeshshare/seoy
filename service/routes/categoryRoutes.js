import express from 'express';
import * as CategoryController from '../controllers/categoryController.js';

const router = express.Router();

// Rota para listar todas as categorias
router.get('/', CategoryController.getAllCategories);

// Rota para obter uma categoria por nome
router.get('/:name', CategoryController.getCategory);

export default router;
