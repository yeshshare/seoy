import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Equipment from './equipment.js';

const EquipmentServiceOrder = sequelize.define('EquipmentServiceOrder', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    serviceOrderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: 'ServiceOrders',
        //     key: 'id',
        // },
    },
    equipmentId: {
        type: DataTypes.INTEGER,
        references: {
            model: Equipment,
            key: 'id',
        },
        allowNull: false,
    },
    inTransit: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

export default EquipmentServiceOrder;
