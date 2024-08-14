import * as SubcategoryService from '../services/subcategoryService.js';

// Controlador para listar subcategorias por categoria
export const getSubcategoriesByCategory = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        const subcategories = await SubcategoryService.listSubcategories(categoryName);
        // Retorna a lista distinta de subcategorias
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ message: `Erro ao listar subcategorias: ${error.message}` });
    }
};

// Controlador para obter uma subcategoria por nome
export const getSubcategory = async (req, res) => {
    try {
        const name = req.params.name;
        const subcategory = await SubcategoryService.getSubcategoryByName(name);
        if (subcategory) {
            res.status(200).json(subcategory);
        } else {
            res.status(404).json({ message: `Subcategoria com nome ${name} não encontrada` });
        }
    } catch (error) {
        res.status(500).json({ message: `Erro ao obter subcategoria: ${error.message}` });
    }
};
