import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Stock = sequelize.define('Stock', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
    },
    hasAddress: {
        type: DataTypes.BOOLEAN,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

export default Stock;

