import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Projeto = sequelize.define('Projeto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
    },
});

export default Projeto;
