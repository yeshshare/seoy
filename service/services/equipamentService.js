import Equipment from '../models/equipment.js';
import Category from '../models/category.js'; // Certifique-se de importar o modelo correto
import Subcategory from '../models/subcategory.js'; // Certifique-se de importar o modelo correto

// Serviço para listar equipamentos filtrados por categoria e subcategoria
export const listEquipmentsByCategoryAndSubcategory = async (categoryName, subcategoryName) => {
    try {
        // Filtra equipamentos com base na categoria e subcategoria fornecidas
        return await Equipment.findAll({
            where: {
                categoriafield: categoryName, // Filtra equipamentos pela categoria
                subcategoriafield: subcategoryName // Filtra equipamentos pela subcategoria
            },
            include: [
                { model: Subcategory, as: 'Subcategory' } // Inclui a subcategoria para referência
            ]
        });
    } catch (error) {
        throw new Error(`Erro ao listar equipamentos: ${error.message}`);
    }
};

// Serviço para obter um equipamento por ID
export const getEquipmentById = async (id) => {
    try {
        return await Equipment.findOne({
            where: { id },
            include: [
                { model: Subcategory, as: 'Subcategory' } // Inclui a subcategoria para referência
            ]
        });
    } catch (error) {
        throw new Error(`Erro ao obter equipamento: ${error.message}`);
    }
};
