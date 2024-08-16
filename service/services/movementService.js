import Movement from '../models/movement.js';

// Register a new movement
export const registerMovement = async (type, stockId, productId, quantity, date) => {
    try {
        const movement = await Movement.create({ type, stockId, productId, quantity, date });
        return movement;
    } catch (err) {
        throw new Error(err.message);
    }
};

// List all movements, considering the filter for isDeleted
export const listMovements = async (includeDeleted = false) => {
    const where = includeDeleted ? {} : { isDeleted: false };
    try {
        const movements = await Movement.findAll({ where });
        return movements;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Get a specific movement by ID, considering the filter for isDeleted
export const getMovementById = async (id, includeDeleted = false) => {
    const where = includeDeleted ? { id } : { id, isDeleted: false };
    try {
        const movement = await Movement.findOne({ where });
        return movement;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Mark a movement as deleted (does not physically delete it)
export const deleteMovement = async (id) => {
    try {
        const [updated] = await Movement.update({ isDeleted: true }, { where: { id } });
        return updated ? { changes: updated } : null;
    } catch (err) {
        throw new Error(err.message);
    }
};
