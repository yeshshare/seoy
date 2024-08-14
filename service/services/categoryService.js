import Category from '../models/category.js';
import db from '../config/database-mysql.js';

// Serviço para listar todas as categorias
export const listCategories = async () => {
    try {
        const categories = await Category.findAll({
            attributes: [[db.Sequelize.fn('DISTINCT', db.Sequelize.col('categoriafield')), 'categoriafield']]
        });
        return categories.map(category => category.categoriafield);
    } catch (error) {
        throw new Error(`Erro ao listar categorias: ${error.message}`);
    }
};

// Serviço para obter uma categoria por nome
export const getCategoryByName = async (name) => {
    try {
        return await Category.findOne({ where: { categoriafield: name } });
    } catch (error) {
        throw new Error(`Erro ao obter categoria: ${error.message}`);
    }
};
