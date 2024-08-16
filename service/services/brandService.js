import { Brandservice } from '../models/index.js';

// List all brandServices, considering the filter for isDeleted
export const listBrandservices = async (includeDeleted = false) => {
    const where = includeDeleted ? {} : { isDeleted: false };
    try {
        const items = await Brandservice.findAll({ where });
        return items;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Create a new brandService
export const createBrandservice = async (data) => {
    try {
        const item = await Brandservice.create(data);
        return item;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Get a specific brandService by ID, considering the filter for isDeleted
export const getBrandserviceById = async (id, includeDeleted = false) => {
    const where = includeDeleted ? { id } : { id, isDeleted: false };
    try {
        const item = await Brandservice.findOne({ where });
        return item;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Update an existing brandService
export const updateBrandservice = async (id, data) => {
    try {
        const [updated] = await Brandservice.update(data, { where: { id } });
        return updated ? { changes: updated } : null;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Create or update the brandService based on its existence in the database
export const createOrUpdateBrandservice = async (data) => {
    const { id } = data;
    try {
        const item = await Brandservice.findByPk(id);
        if (item) {
            await updateBrandservice(id, data);
        } else {
            await createBrandservice(data);
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

// Mark a brandService as deleted (does not physically delete it)
export const deleteBrandservice = async (id) => {
    try {
        const [updated] = await Brandservice.update({ isDeleted: true }, { where: { id } });
        return updated ? { changes: updated } : null;
    } catch (err) {
        throw new Error(err.message);
    }
};
