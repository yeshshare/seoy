import { Modelservice } from '../models/index.js';

// List all modelServices, considering the filter for isDeleted
export const listModelservices = async (includeDeleted = false) => {
    const where = includeDeleted ? {} : { isDeleted: false };
    try {
        const items = await Modelservice.findAll({ where });
        return items;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Create a new modelService
export const createModelservice = async (data) => {
    try {
        const item = await Modelservice.create(data);
        return item;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Get a specific modelService by ID, considering the filter for isDeleted
export const getModelserviceById = async (id, includeDeleted = false) => {
    const where = includeDeleted ? { id } : { id, isDeleted: false };
    try {
        const item = await Modelservice.findOne({ where });
        return item;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Update an existing modelService
export const updateModelservice = async (id, data) => {
    try {
        const [updated] = await Modelservice.update(data, { where: { id } });
        return updated ? { changes: updated } : null;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Create or update the modelService based on its existence in the database
export const createOrUpdateModelservice = async (data) => {
    const { id } = data;
    try {
        const item = await Modelservice.findByPk(id);
        if (item) {
            await updateModelservice(id, data);
        } else {
            await createModelservice(data);
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

// Mark a modelService as deleted (does not physically delete it)
export const deleteModelservice = async (id) => {
    try {
        const [updated] = await Modelservice.update({ isDeleted: true }, { where: { id } });
        return updated ? { changes: updated } : null;
    } catch (err) {
        throw new Error(err.message);
    }
};
