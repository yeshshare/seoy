// Configuração do Sequelize para SQLite
import sequelize from '../config/database.js'; // Instância existente para SQLite
import Stock from './Stock.js';
import Order from './Order.js';
import Project from './Project.js';
import Movement from './Movement.js';
import User from './User.js';

// Configuração do Sequelize para MySQL
import sequelizeMySQL from '../config/database-mysql.js';
import StockLive from './StockLive.js';
import StockLiveItem from './StockLiveItem.js';
import Category from './Category.js';
import Subcategory from './Subcategory.js';
import Brand from './Brand.js';
import Model from './Model.js';

// Inicializa os modelos para SQLite
Stock.init(sequelize);
Order.init(sequelize);
Project.init(sequelize);
Movement.init(sequelize);
User.init(sequelize);

// Inicializa os modelos para MySQL
StockLive.init(sequelizeMySQL);
StockLiveItem.init(sequelizeMySQL);
Category.init(sequelizeMySQL);
Subcategory.init(sequelizeMySQL);
Brand.init(sequelizeMySQL);
Model.init(sequelizeMySQL);

// Define relacionamentos para MySQL
StockLive.hasOne(StockLiveItem, { foreignKey: 'items_id' });
StockLiveItem.belongsTo(StockLive, { foreignKey: 'items_id' });

Category.hasMany(StockLiveItem, { foreignKey: 'plugin_genericobject_categories_id_categoryfield' });
StockLiveItem.belongsTo(Category, { foreignKey: 'plugin_genericobject_categories_id_categoryfield' });

Subcategory.hasMany(StockLiveItem, { foreignKey: 'plugin_genericobject_subcategories_id_subc1330393017' });
StockLiveItem.belongsTo(Subcategory, { foreignKey: 'plugin_genericobject_subcategories_id_subc1330393017' });

Brand.hasMany(StockLiveItem, { foreignKey: 'plugin_genericobject_brands_id_brandfield' });
StockLiveItem.belongsTo(Brand, { foreignKey: 'plugin_genericobject_brands_id_brandfield' });

Model.hasMany(StockLiveItem, { foreignKey: 'plugin_genericobject_models_id_modelfield' });
StockLiveItem.belongsTo(Model, { foreignKey: 'plugin_genericobject_models_id_modelfield' });

// Exportando todos os modelos e as instâncias do Sequelize
export {
  Stock,
  Order,
  Project,
  Movement,
  User,
  StockLive,
  StockLiveItem,
  Category,
  Subcategory,
  Brand,
  Model,
  sequelize,      // Para SQLite
  sequelizeMySQL  // Para MySQL
};
