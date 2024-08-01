// models/usuario.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Ajuste o caminho conforme necessário

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataCriacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'Usuarios', // Nome da tabela no banco de dados
    timestamps: false,     // Se você não quiser que o Sequelize adicione as colunas createdAt e updatedAt
});

export default Usuario;
