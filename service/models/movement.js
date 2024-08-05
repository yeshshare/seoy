import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Movement = sequelize.define('Movement', {
    stockId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Stocks', // Nome da tabela referenciada, ajustado para o inglês
            key: 'id',
        },
    },
    productId: {
        type: DataTypes.STRING,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    type: {
        type: DataTypes.STRING,
        validate: {
            isIn: [['entry', 'exit']], // Ajustado para termos em inglês
        },
    },
    date: {
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

export default Movement;
