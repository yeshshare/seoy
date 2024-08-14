import Subcategory from '../models/subcategory.js';
import Category from '../models/category.js'; // Importar o modelo Category
import db from '../config/database-mysql.js';

// Serviço para listar subcategorias baseadas em uma categoria
export const listSubcategories = async (categoriafield) => {
    try {
        // Certifique-se de que a relação entre Category e Subcategory está corretamente definida
        const subcategories = await Subcategory.findAll({
            where: { categoriafield },
            attributes: [[db.Sequelize.fn('DISTINCT', db.Sequelize.col('subcategoriafield')), 'subcategoriafield']]
        });
        return subcategories.map(subcategory => subcategory.subcategoriafield);
    } catch (error) {
        throw new Error(`Erro ao listar subcategorias: ${error.message}`);
    }
};

// Serviço para obter uma subcategoria por nome
export const getSubcategoryByName = async (name) => {
    try {
        return await Subcategory.findOne({ where: { subcategoriafield: name } });
    } catch (error) {
        throw new Error(`Erro ao obter subcategoria: ${error.message}`);
    }
};
