import * as movementService from '../services/movementService.js';

// Function to convert query string values to boolean
const parseBoolean = (value) => {
    if (typeof value === 'boolean') return value; // If the value is already boolean, return it
    if (value === 'true') return true; // Convert string 'true' to boolean true
    if (value === 'false') return false; // Convert string 'false' to boolean false
    return false; // Default value if not 'true' or 'false'
};

// List all movements with an option to include deleted
export const listMovements = async (req, res) => {
    const includeDeleted = parseBoolean(req.query.includeDeleted);

    try {
        const movements = await movementService.listMovements(includeDeleted);
        res.status(200).json(movements); // 200 OK
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
    }
};

// Register a new movement
export const registerMovement = async (req, res) => {
    try {
        const { type, stockId, productId, quantity, date } = req.body;
        const movement = await movementService.registerMovement(type, stockId, productId, quantity, date);
        res.status(201).json(movement); // 201 Created
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
    }
};

// Get a specific movement with an option to include deleted
export const getMovement = async (req, res) => {
    const includeDeleted = parseBoolean(req.query.includeDeleted);

    try {
        const movement = await movementService.getMovementById(req.params.id, includeDeleted);
        if (movement) {
            res.status(200).json(movement); // 200 OK
        } else {
            res.status(404).json({ error: 'Movement not found' }); // 404 Not Found
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
    }
};

// Mark a movement as deleted (does not physically delete it)
export const deleteMovement = async (req, res) => {
    try {
        const deleted = await movementService.deleteMovement(req.params.id);
        if (deleted.changes) {
            res.status(200).json({ message: 'Movement deleted successfully' }); // 200 OK
        } else {
            res.status(404).json({ error: 'Movement not found' }); // 404 Not Found
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
    }
};
