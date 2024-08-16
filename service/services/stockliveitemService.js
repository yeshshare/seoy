import { Stockliveitemservice } from '../models/index.js';

// List all stockliveitemServices, considering the filter for isDeleted
export const listStockliveitemservices = async (includeDeleted = false) => {
    const where = includeDeleted ? {} : { isDeleted: false };
    try {
        const items = await Stockliveitemservice.findAll({ where });
        return items;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Create a new stockliveitemService
export const createStockliveitemservice = async (data) => {
    try {
        const item = await Stockliveitemservice.create(data);
        return item;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Get a specific stockliveitemService by ID, considering the filter for isDeleted
export const getStockliveitemserviceById = async (id, includeDeleted = false) => {
    const where = includeDeleted ? { id } : { id, isDeleted: false };
    try {
        const item = await Stockliveitemservice.findOne({ where });
        return item;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Update an existing stockliveitemService
export const updateStockliveitemservice = async (id, data) => {
    try {
        const [updated] = await Stockliveitemservice.update(data, { where: { id } });
        return updated ? { changes: updated } : null;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Create or update the stockliveitemService based on its existence in the database
export const createOrUpdateStockliveitemservice = async (data) => {
    const { id } = data;
    try {
        const item = await Stockliveitemservice.findByPk(id);
        if (item) {
            await updateStockliveitemservice(id, data);
        } else {
            await createStockliveitemservice(data);
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

// Mark a stockliveitemService as deleted (does not physically delete it)
export const deleteStockliveitemservice = async (id) => {
    try {
        const [updated] = await Stockliveitemservice.update({ isDeleted: true }, { where: { id } });
        return updated ? { changes: updated } : null;
    } catch (err) {
        throw new Error(err.message);
    }
};
