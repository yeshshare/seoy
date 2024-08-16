import Order from '../models/order.js';

// List all orders, considering the filter for isDeleted
export const listOrders = async (includeDeleted = false) => {
    const where = includeDeleted ? {} : { isDeleted: false };
    try {
        const orders = await Order.findAll({ where });
        return orders;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Create a new order
export const createOrder = async (data) => {
    try {
        const order = await Order.create(data);
        return order;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Get a specific order by ID, considering the filter for isDeleted
export const getOrderById = async (id, includeDeleted = false) => {
    const where = includeDeleted ? { id } : { id, isDeleted: false };
    try {
        const order = await Order.findOne({ where });
        return order;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Update an existing order
export const updateOrder = async (id, data) => {
    try {
        const [updated] = await Order.update(data, { where: { id } });
        return updated ? { changes: updated } : null;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Create or update the order based on its existence in the database
export const createOrUpdateOrder = async (data) => {
    const { id } = data;
    try {
        const order = await Order.findByPk(id);
        if (order) {
            return await updateOrder(id, data);
        } else {
            return await createOrder(data);
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

// Mark an order as deleted (does not physically delete it)
export const deleteOrder = async (id) => {
    try {
        const [updated] = await Order.update({ isDeleted: true }, { where: { id } });
        return updated ? { changes: updated } : null;
    } catch (err) {
        throw new Error(err.message);
    }
};
