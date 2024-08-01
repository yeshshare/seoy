import db from '../config/database.js';

const listarOrdens = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM ordens', [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const criarOrdem = (data) => {
    return new Promise((resolve, reject) => {
        const { clienteId, projetoId, status } = data;
        db.run('INSERT INTO ordens (clienteId, projetoId, status) VALUES (?, ?, ?)', [clienteId, projetoId, status], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID });
            }
        });
    });
};

const obterOrdem = (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM ordens WHERE id = ?', [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

const atualizarOrdem = (id, data) => {
    return new Promise((resolve, reject) => {
        const { clienteId, projetoId, status } = data;
        db.run('UPDATE ordens SET clienteId = ?, projetoId = ?, status = ? WHERE id = ?', [clienteId, projetoId, status, id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });
};

const excluirOrdem = (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM ordens WHERE id = ?', [id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });
};

export default {
    listarOrdens,
    criarOrdem,
    obterOrdem,
    atualizarOrdem,
    excluirOrdem
};
