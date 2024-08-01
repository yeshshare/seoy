import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Carregar variáveis de ambiente

const env = process.env.NODE_ENV || 'development';

const sqlitePath =
    env === 'development' ? process.env.DEVELOPMENT_SQLITE_DB_PATH :
        env === 'production' ? process.env.PRODUCTION_SQLITE_DB_PATH :
            env === 'homolog' ? process.env.HOMOLOG_SQLITE_DB_PATH :
                process.env.SQLITE_DB_PATH;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: sqlitePath, // Caminho para o banco de dados
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexão ao banco de dados SQLite estabelecida com sucesso.');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados SQLite:', error);
    }
}

testConnection();

export default sequelize;
