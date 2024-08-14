import * as EquipmentService from '../services/equipmentService.js';

// Controlador para listar equipamentos filtrados por categoria e subcategoria
export const getEquipmentsByCategoryAndSubcategory = async (req, res) => {
    try {
        const { categoryName, subcategoryName } = req.params;
        const equipments = await EquipmentService.listEquipmentsByCategoryAndSubcategory(categoryName, subcategoryName);
        res.status(200).json(equipments);
    } catch (error) {
        res.status(500).json({ message: `Erro ao listar equipamentos: ${error.message}` });
    }
};

// Controlador para obter um equipamento por ID
export const getEquipmentById = async (req, res) => {
    try {
        const id = req.params.id;
        const equipment = await EquipmentService.getEquipmentById(id);
        if (equipment) {
            res.status(200).json(equipment);
        } else {
            res.status(404).json({ message: `Equipamento com ID ${id} não encontrado` });
        }
    } catch (error) {
        res.status(500).json({ message: `Erro ao obter equipamento: ${error.message}` });
    }
};
