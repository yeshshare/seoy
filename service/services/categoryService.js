import { Categoryservice } from '../models/index.js';

// List all categoryServices, considering the filter for isDeleted
export const listCategoryservices = async (includeDeleted = false) => {
    const where = includeDeleted ? {} : { isDeleted: false };
    try {
        const items = await Categoryservice.findAll({ where });
        return items;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Create a new categoryService
export const createCategoryservice = async (data) => {
    try {
        const item = await Categoryservice.create(data);
        return item;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Get a specific categoryService by ID, considering the filter for isDeleted
export const getCategoryserviceById = async (id, includeDeleted = false) => {
    const where = includeDeleted ? { id } : { id, isDeleted: false };
    try {
        const item = await Categoryservice.findOne({ where });
        return item;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Update an existing categoryService
export const updateCategoryservice = async (id, data) => {
    try {
        const [updated] = await Categoryservice.update(data, { where: { id } });
        return updated ? { changes: updated } : null;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Create or update the categoryService based on its existence in the database
export const createOrUpdateCategoryservice = async (data) => {
    const { id } = data;
    try {
        const item = await Categoryservice.findByPk(id);
        if (item) {
            await updateCategoryservice(id, data);
        } else {
            await createCategoryservice(data);
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

// Mark a categoryService as deleted (does not physically delete it)
export const deleteCategoryservice = async (id) => {
    try {
        const [updated] = await Categoryservice.update({ isDeleted: true }, { where: { id } });
        return updated ? { changes: updated } : null;
    } catch (err) {
        throw new Error(err.message);
    }
};
