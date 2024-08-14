import { DataTypes } from 'sequelize';
import db from '../config/database-mysql.js';
import Category from './category.js'; // Importe a model Category
import Subcategory from './subcategory.js'; // Importe a model Subcategory

const Equipment = db.define('Equipment', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ''
    },
    locations_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
    states_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
    groups_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
    is_helpdesk_visible: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    categoriafield: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    subcategoriafield: {
        type: DataTypes.STRING(255),
        allowNull: true,
    }
}, {
    tableName: 'glpi_plugin_genericobject_estoquelives',
    timestamps: false
});

// Define relationships
Equipment.belongsTo(Category, {
    foreignKey: 'categoriafield',
    targetKey: 'categoriafield',
    as: 'Category'
});

Equipment.belongsTo(Subcategory, {
    foreignKey: 'subcategoriafield',
    targetKey: 'subcategoriafield',
    as: 'Subcategory'
});

export default Equipment;
