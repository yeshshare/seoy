// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Ajuste o caminho conforme necessário

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'Users', // Nome da tabela no banco de dados
    timestamps: true, // Se você deseja usar os campos createdAt e updatedAt
    createdAt: 'createdAt', // Nome personalizado para o campo de criação
    updatedAt: 'updatedAt', // Nome personalizado para o campo de atualização
});

export default User;
