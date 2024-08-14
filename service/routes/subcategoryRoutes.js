import express from 'express';
import * as SubcategoryController from '../controllers/subcategoryController.js';

const router = express.Router();

// Rota para listar subcategorias por categoria
router.get('/by-category/:categoryName', SubcategoryController.getSubcategoriesByCategory);

// Rota para obter uma subcategoria por nome
router.get('/:name', SubcategoryController.getSubcategory);

export default router;
