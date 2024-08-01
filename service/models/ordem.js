import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Ordem = sequelize.define('Ordem', {
    clienteId: {
        type: DataTypes.STRING,
    },
    projetoId: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    },
    dataCriacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

export default Ordem;
