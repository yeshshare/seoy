import sequelize from '../config/database.js';
import Stock from './stock.js';
import Order from './order.js';
import Project from './project.js';
import Movement from './movement.js';
import User from './user.js';
import Equipment from './equipment.js';
import EquipmentStock from './equipmentStock.js';
import EquipmentServiceOrder from './equipmentServiceOrder.js';

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

// Associando Equipment e Stock
Equipment.belongsToMany(Stock, { through: EquipmentStock, foreignKey: 'productId' });
Stock.belongsToMany(Equipment, { through: EquipmentStock, foreignKey: 'stockId' });

// Associando Equipment e EquipmentServiceOrder
Equipment.hasMany(EquipmentServiceOrder, { foreignKey: 'productId' });
EquipmentServiceOrder.belongsTo(Equipment, { foreignKey: 'productId' });

// Exportando todos os modelos e a instância do Sequelize
export { Stock, Order, Project, Movement, User, Equipment, EquipmentStock, EquipmentServiceOrder, sequelize };
