import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Movimentacao = sequelize.define('Movimentacao', {
    estoqueId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Estoques', // Nome da tabela referenciada
            key: 'id',
        },
    },
    produtoId: {
        type: DataTypes.STRING,
    },
    quantidade: {
        type: DataTypes.INTEGER,
    },
    tipo: {
        type: DataTypes.STRING,
        validate: {
            isIn: [['entrada', 'saida']],
        },
    },
    data: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

export default Movimentacao;
