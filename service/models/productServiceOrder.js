import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Product from './product.js';

const ProductServiceOrder = sequelize.define('ProductServiceOrder', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    serviceOrderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: 'ServiceOrders',
        //     key: 'id',
        // },
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id',
        },
        allowNull: false,
    },
    inTransit: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

export default ProductServiceOrder;
