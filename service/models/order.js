import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Order = sequelize.define('Order', {
    clientId: {
        type: DataTypes.STRING,
    },
    projectId: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    },
    creationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
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

export default Order;
