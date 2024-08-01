import sequelize from './database.js';
import Estoque from '../models/estoque.js';
import Ordem from '../models/ordem.js';
import Projeto from '../models/projeto.js';
import Movimentacao from '../models/movimentacao.js';
import Usuario from '../models/usuario.js';

// Se necessário, registre associações ou outras configurações aqui

async function syncDatabase() {
    const environment = process.env.NODE_ENV || 'development';
    const syncMode =
        environment === 'development' ? process.env.DEVELOPMENT_DB_SYNC_MODE :
            environment === 'production' ? process.env.PRODUCTION_DB_SYNC_MODE :
                environment === 'homolog' ? process.env.HOMOLOG_DB_SYNC_MODE :
                    process.env.DB_SYNC_MODE || 'safe'; // 'safe' é o padrão

    console.log(`environment : ${environment}`);
    console.log(`syncMode : ${syncMode}`);

    const syncOptions =
        syncMode === 'force' ? { force: true } :
            syncMode === 'alter' ? { alter: true } :
                {};

    try {
        await sequelize.sync(syncOptions);
        console.log('Banco de dados e tabelas sincronizados com sucesso!');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
}

syncDatabase();
