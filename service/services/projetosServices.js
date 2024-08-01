import db from '../config/database.js';

export const listarProjetos = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM projetos', [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

export const criarProjeto = (data) => {
    return new Promise((resolve, reject) => {
        const { nome, descricao } = data;
        db.run('INSERT INTO projetos (nome, descricao) VALUES (?, ?)', [nome, descricao], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID });
            }
        });
    });
};

export const obterProjeto = (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM projetos WHERE id = ?', [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

export const atualizarProjeto = (id, data) => {
    return new Promise((resolve, reject) => {
        const { nome, descricao } = data;
        db.run('UPDATE projetos SET nome = ?, descricao = ? WHERE id = ?', [nome, descricao, id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });
};

export const excluirProjeto = (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM projetos WHERE id = ?', [id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });
};


