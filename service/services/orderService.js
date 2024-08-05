import db from '../config/database.js';

// List all orders, considering the filter for isDeleted
export const listOrders = async (includeDeleted = false) => {
    const condition = includeDeleted ? '' : 'WHERE isDeleted = 0';
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM orders ${condition}`, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Create a new order
export const createOrder = async (data) => {
    const { customerId, projectId, status } = data;
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO orders (customerId, projectId, status) VALUES (?, ?, ?)', [customerId, projectId, status], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID });
            }
        });
    });
};

// Get a specific order by ID, considering the filter for isDeleted
export const getOrderById = async (id, includeDeleted = false) => {
    const condition = includeDeleted ? '' : 'AND isDeleted = 0';
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM orders WHERE id = ? ${condition}`, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

// Update an existing order
export const updateOrder = async (id, data) => {
    const { customerId, projectId, status } = data;
    return new Promise((resolve, reject) => {
        db.run('UPDATE orders SET customerId = ?, projectId = ?, status = ? WHERE id = ?', [customerId, projectId, status, id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });
};

// Create or update the order based on its existence in the database
export const createOrUpdateOrder = async (data) => {
    const { id } = data;
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM orders WHERE id = ?', [id], (err, row) => {
            if (err) {
                reject(err);
            } else if (row) {
                resolve(updateOrder(id, data));
            } else {
                resolve(createOrder(data));
            }
        });
    });
};

// Mark an order as deleted (does not physically delete it)
export const deleteOrder = async (id) => {
    return new Promise((resolve, reject) => {
        db.run('UPDATE orders SET isDeleted = 1 WHERE id = ?', [id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });
};
