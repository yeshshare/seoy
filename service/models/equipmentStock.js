import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Stock from './stock.js';
import Equipment from './equipment.js';

const EquipmentStock = sequelize.define('EquipmentStock', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    stockId: {
        type: DataTypes.INTEGER,
        references: {
            model: Stock,
            key: 'id',
        },
        allowNull: false,
    },
    equipmentId: {
        type: DataTypes.INTEGER,
        references: {
            model: Equipment,
            key: 'id',
        },
        allowNull: false,
    },
});

export default EquipmentStock;
