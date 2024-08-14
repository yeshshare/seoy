// models/Category.js
import { DataTypes } from 'sequelize';
import db from '../config/database-mysql.js';

const Category = db.define('Category', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
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

export default Category;
