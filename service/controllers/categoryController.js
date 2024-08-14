import * as CategoryService from '../services/categoryService.js';

// Controlador para listar todas as categorias
export const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryService.listCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: `Erro ao listar categorias: ${error.message}` });
    }
};

// Controlador para obter uma categoria por nome
export const getCategory = async (req, res) => {
    try {
        const name = req.params.name;
        const category = await CategoryService.getCategoryByName(name);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: `Categoria com nome ${name} não encontrada` });
        }
    } catch (error) {
        res.status(500).json({ message: `Erro ao obter categoria: ${error.message}` });
    }
};
