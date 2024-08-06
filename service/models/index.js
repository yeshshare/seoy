import sequelize from '../config/database.js';
import Stock from './stock.js';
import Order from './order.js';
import Project from './project.js';
import Movement from './movement.js';
import User from './user.js';
import Product from './product.js';
import ProductStock from './productStock.js';
import ProductServiceOrder from './productServiceOrder.js';

// Definindo associações entre os modelos
// Associando Stock e Order (ajuste conforme necessário)
// Stock.hasMany(Order, { foreignKey: 'stockId' });
// Order.belongsTo(Stock, { foreignKey: 'stockId' });

// Associando Project e Movement (ajuste conforme necessário)
// Project.hasMany(Movement, { foreignKey: 'projectId' });
// Movement.belongsTo(Project, { foreignKey: 'projectId' });

// Associando User e Order (ajuste conforme necessário)
// User.hasMany(Order, { foreignKey: 'userId' });
// Order.belongsTo(User, { foreignKey: 'userId' });

// Associando Product e Stock
Product.belongsToMany(Stock, { through: ProductStock, foreignKey: 'productId' });
Stock.belongsToMany(Product, { through: ProductStock, foreignKey: 'stockId' });

// Associando Product e ProductServiceOrder
Product.hasMany(ProductServiceOrder, { foreignKey: 'productId' });
ProductServiceOrder.belongsTo(Product, { foreignKey: 'productId' });

// Exportando todos os modelos e a instância do Sequelize
export { Stock, Order, Project, Movement, User, Product, ProductStock, ProductServiceOrder, sequelize };
