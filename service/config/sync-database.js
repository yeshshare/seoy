import { sequelize } from '../models/index.js'; // Importando sequelize e modelos do index.js

async function syncDatabase() {
    const environment = process.env.NODE_ENV || 'development';
    const syncMode =
        environment === 'development' ? process.env.DEVELOPMENT_DB_SYNC_MODE :
            environment === 'production' ? process.env.PRODUCTION_DB_SYNC_MODE :
                environment === 'staging' ? process.env.STAGING_DB_SYNC_MODE :
                    process.env.DB_SYNC_MODE || 'safe'; // 'safe' é o padrão

    console.log(`Environment: ${environment}`);
    console.log(`Sync Mode: ${syncMode}`);

    const syncOptions =
        syncMode === 'force' ? { force: true } :
            syncMode === 'alter' ? { alter: true } :
                {};

    try {
        await sequelize.sync(syncOptions);
        console.log('Database and tables synchronized successfully!');
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
}

syncDatabase();
