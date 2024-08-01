import db from '../config/database.js';

const registrarMovimentacao = (tipo, estoqueId, produtoId, quantidade, data) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO movimentacoes (tipo, estoqueId, produtoId, quantidade, data) VALUES (?, ?, ?, ?, ?)', [tipo, estoqueId, produtoId, quantidade, data], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID });
            }
        });
    });
};

const listarMovimentacoes = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM movimentacoes', [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

export default {
    registrarMovimentacao,
    listarMovimentacoes
};
