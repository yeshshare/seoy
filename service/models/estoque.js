import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Estoque = sequelize.define('Estoque', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING,
    },
    temEndereco: {
        type: DataTypes.BOOLEAN,
    },
});

export default Estoque;
