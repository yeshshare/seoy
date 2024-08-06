import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Stock from './stock.js';
import Product from './product.js';

const ProductStock = sequelize.define('ProductStock', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    stockId: {
        type: DataTypes.INTEGER,
        references: {
            model: Stock,
            key: 'id',
        },
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id',
        },
        allowNull: false,
    },
});

export default ProductStock;
