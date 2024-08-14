import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Carregar variáveis de ambiente

const env = process.env.NODE_ENV || 'development';

const mysqlSequelize = new Sequelize(
    env === 'development' ? process.env.DEVELOPMENT_MYSQL_DATABASE :
    env === 'production' ? process.env.PRODUCTION_MYSQL_DATABASE :
    env === 'homolog' ? process.env.HOMOLOG_MYSQL_DATABASE :
    process.env.MYSQL_DATABASE,
    env === 'development' ? process.env.DEVELOPMENT_MYSQL_USER :
    env === 'production' ? process.env.PRODUCTION_MYSQL_USER :
    env === 'homolog' ? process.env.HOMOLOG_MYSQL_USER :
    process.env.MYSQL_USER,
    env === 'development' ? process.env.DEVELOPMENT_MYSQL_PASSWORD :
    env === 'production' ? process.env.PRODUCTION_MYSQL_PASSWORD :
    env === 'homolog' ? process.env.HOMOLOG_MYSQL_PASSWORD :
    process.env.MYSQL_PASSWORD,
    {
        host: env === 'development' ? process.env.DEVELOPMENT_MYSQL_HOST :
            env === 'production' ? process.env.PRODUCTION_MYSQL_HOST :
            env === 'homolog' ? process.env.HOMOLOG_MYSQL_HOST :
            process.env.MYSQL_HOST,
        dialect: 'mysql',
        port: parseInt(env === 'development' ? process.env.DEVELOPMENT_MYSQL_PORT :
            env === 'production' ? process.env.PRODUCTION_MYSQL_PORT :
            env === 'homolog' ? process.env.HOMOLOG_MYSQL_PORT :
            process.env.MYSQL_PORT, 10),
        logging: false, // Ative o logging se necessário
    }
);

async function testMysqlConnection() {
    try {
        await mysqlSequelize.authenticate();
        console.log('Conexão ao banco de dados MySQL estabelecida com sucesso.');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados MySQL:', error);
    }
}

testMysqlConnection();

export default mysqlSequelize;
