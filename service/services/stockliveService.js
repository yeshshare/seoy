import { Stockliveservice } from '../models/index.js';

// List all stockliveServices, considering the filter for isDeleted
export const listStockliveservices = async (includeDeleted = false) => {
    const where = includeDeleted ? {} : { isDeleted: false };
    try {
        const items = await Stockliveservice.findAll({ where });
        return items;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Create a new stockliveService
export const createStockliveservice = async (data) => {
    try {
        const item = await Stockliveservice.create(data);
        return item;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Get a specific stockliveService by ID, considering the filter for isDeleted
export const getStockliveserviceById = async (id, includeDeleted = false) => {
    const where = includeDeleted ? { id } : { id, isDeleted: false };
    try {
        const item = await Stockliveservice.findOne({ where });
        return item;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Update an existing stockliveService
export const updateStockliveservice = async (id, data) => {
    try {
        const [updated] = await Stockliveservice.update(data, { where: { id } });
        return updated ? { changes: updated } : null;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Create or update the stockliveService based on its existence in the database
export const createOrUpdateStockliveservice = async (data) => {
    const { id } = data;
    try {
        const item = await Stockliveservice.findByPk(id);
        if (item) {
            await updateStockliveservice(id, data);
        } else {
            await createStockliveservice(data);
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

// Mark a stockliveService as deleted (does not physically delete it)
export const deleteStockliveservice = async (id) => {
    try {
        const [updated] = await Stockliveservice.update({ isDeleted: true }, { where: { id } });
        return updated ? { changes: updated } : null;
    } catch (err) {
        throw new Error(err.message);
    }
};
