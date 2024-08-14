// models/Subcategory.js
import { DataTypes } from 'sequelize';
import db from '../config/database-mysql.js';
import Category from './category.js';

const Subcategory = db.define('Subcategory', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    subcategoriafield: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    categoriafield: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'glpi_plugin_fields_plugingenericobjectestoqueliveeils',
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

// Associa a subcategoria à categoria
Subcategory.belongsTo(Category, {
    foreignKey: 'categoriafield',
    targetKey: 'categoriafield',
    constraints: false
});

export default Subcategory;