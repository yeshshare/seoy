import db from '../config/database.js';

// Register a new movement
export const registerMovement = (type, stockId, productId, quantity, date) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO movements (type, stockId, productId, quantity, date) VALUES (?, ?, ?, ?, ?)', [type, stockId, productId, quantity, date], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID });
            }
        });
    });
};

// List all movements, considering the filter for isDeleted
export const listMovements = (includeDeleted = false) => {
    const query = includeDeleted ? 'SELECT * FROM movements' : 'SELECT * FROM movements WHERE isDeleted = 0';
    return new Promise((resolve, reject) => {
        db.all(query, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Get a specific movement by ID, considering the filter for isDeleted
export const getMovementById = (id, includeDeleted = false) => {
    const query = includeDeleted ? 'SELECT * FROM movements WHERE id = ?' : 'SELECT * FROM movements WHERE id = ? AND isDeleted = 0';
    return new Promise((resolve, reject) => {
        db.get(query, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

// Mark a movement as deleted (does not physically delete it)
export const deleteMovement = (id) => {
    return new Promise((resolve, reject) => {
        db.run('UPDATE movements SET isDeleted = 1 WHERE id = ?', [id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });
};
