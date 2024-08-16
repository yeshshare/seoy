import { Subcategoryservice } from '../models/index.js';

// List all subcategoryServices, considering the filter for isDeleted
export const listSubcategoryservices = async (includeDeleted = false) => {
    const where = includeDeleted ? {} : { isDeleted: false };
    try {
        const items = await Subcategoryservice.findAll({ where });
        return items;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Create a new subcategoryService
export const createSubcategoryservice = async (data) => {
    try {
        const item = await Subcategoryservice.create(data);
        return item;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Get a specific subcategoryService by ID, considering the filter for isDeleted
export const getSubcategoryserviceById = async (id, includeDeleted = false) => {
    const where = includeDeleted ? { id } : { id, isDeleted: false };
    try {
        const item = await Subcategoryservice.findOne({ where });
        return item;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Update an existing subcategoryService
export const updateSubcategoryservice = async (id, data) => {
    try {
        const [updated] = await Subcategoryservice.update(data, { where: { id } });
        return updated ? { changes: updated } : null;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Create or update the subcategoryService based on its existence in the database
export const createOrUpdateSubcategoryservice = async (data) => {
    const { id } = data;
    try {
        const item = await Subcategoryservice.findByPk(id);
        if (item) {
            await updateSubcategoryservice(id, data);
        } else {
            await createSubcategoryservice(data);
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

// Mark a subcategoryService as deleted (does not physically delete it)
export const deleteSubcategoryservice = async (id) => {
    try {
        const [updated] = await Subcategoryservice.update({ isDeleted: true }, { where: { id } });
        return updated ? { changes: updated } : null;
    } catch (err) {
        throw new Error(err.message);
    }
};
