import Project from '../models/project.js';

// List all projects, considering the filter for isDeleted
export const listProjects = async (includeDeleted = false) => {
    const where = includeDeleted ? {} : { isDeleted: false };
    try {
        const projects = await Project.findAll({ where });
        return projects;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Create a new project
export const createProject = async (data) => {
    try {
        const project = await Project.create(data);
        return project;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Get a specific project by ID, considering the filter for isDeleted
export const getProjectById = async (id, includeDeleted = false) => {
    const where = includeDeleted ? { id } : { id, isDeleted: false };
    try {
        const project = await Project.findOne({ where });
        return project;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Update an existing project
export const updateProject = async (id, data) => {
    try {
        const [updated] = await Project.update(data, { where: { id } });
        return updated ? { changes: updated } : null;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Create or update the project based on its existence in the database
export const createOrUpdateProject = async (data) => {
    const { id } = data;
    try {
        const project = await Project.findByPk(id);
        if (project) {
            await updateProject(id, data);
        } else {
            await createProject(data);
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

// Mark a project as deleted (does not physically delete it)
export const deleteProject = async (id) => {
    try {
        const [updated] = await Project.update({ isDeleted: true }, { where: { id } });
        return updated ? { changes: updated } : null;
    } catch (err) {
        throw new Error(err.message);
    }
};
