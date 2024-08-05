import * as orderService from '../services/orderService.js';

// Function to convert query string values to boolean
const parseBoolean = (value) => {
    if (typeof value === 'boolean') return value; // If the value is already boolean, return it
    if (value === 'true') return true; // Convert string 'true' to boolean true
    if (value === 'false') return false; // Convert string 'false' to boolean false
    return false; // Default value if not 'true' or 'false'
};

// List all orders with an option to include deleted
export const listOrders = async (req, res) => {
    const includeDeleted = parseBoolean(req.query.includeDeleted);

    try {
        const orders = await orderService.listOrders(includeDeleted);
        res.status(200).json(orders); // 200 OK
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
    }
};

// Create or update an order
export const createOrder = async (req, res) => {
    const createOrUpdate = parseBoolean(req.query.createOrUpdate);

    try {
        const orderData = req.body;
        let result;

        if (createOrUpdate) {
            result = await orderService.createOrUpdateOrder(orderData);
            res.status(201).json(result); // 201 Created
        } else {
            result = await orderService.createOrder(orderData);
            res.status(201).json(result); // 201 Created
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
    }
};

// Get a specific order with an option to include deleted
export const getOrder = async (req, res) => {
    const includeDeleted = parseBoolean(req.query.includeDeleted);

    try {
        const order = await orderService.getOrder(req.params.id, includeDeleted);
        if (order) {
            res.status(200).json(order); // 200 OK
        } else {
            res.status(404).json({ error: 'Order not found' }); // 404 Not Found
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
    }
};

// Update a specific order
export const updateOrder = async (req, res) => {
    try {
        const updated = await orderService.updateOrder(req.params.id, req.body);
        if (updated) {
            res.status(200).json({ message: 'Order updated successfully' }); // 200 OK
        } else {
            res.status(404).json({ error: 'Order not found' }); // 404 Not Found
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
    }
};

// Mark an order as deleted (does not physically delete it)
export const deleteOrder = async (req, res) => {
    try {
        const deleted = await orderService.deleteOrder(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Order deleted successfully' }); // 200 OK
        } else {
            res.status(404).json({ error: 'Order not found' }); // 404 Not Found
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
    }
};
