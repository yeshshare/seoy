import * as projectService from '../services/projectService.js';

// Function to convert query string values to boolean
const parseBoolean = (value) => {
    if (typeof value === 'boolean') return value; // If the value is already boolean, return it
    if (value === 'true') return true; // Convert string 'true' to boolean true
    if (value === 'false') return false; // Convert string 'false' to boolean false
    return false; // Default value if not 'true' or 'false'
};

// List all projects with an option to include deleted
export const listProjects = async (req, res) => {
    const includeDeleted = parseBoolean(req.query.includeDeleted);

    try {
        const projects = await projectService.listProjects(includeDeleted);
        res.status(200).json(projects); // 200 OK
    } catch (err) {
        res.status(500).json({ error: ` Internal Server Error ${err} ` }); // 500 Internal Server Error
    }
};

// Create or update a project
export const createProject = async (req, res) => {
    const createOrUpdate = parseBoolean(req.query.createOrUpdate);

    try {
        const projectData = req.body;
        let result;

        if (createOrUpdate) {
            result = await projectService.createOrUpdateProject(projectData);
            res.status(201).json(result); // 201 Created
        } else {
            result = await projectService.createProject(projectData);
            res.status(201).json(result); // 201 Created
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
    }
};

// Get a specific project with an option to include deleted
export const getProject = async (req, res) => {
    const includeDeleted = parseBoolean(req.query.includeDeleted);

    try {
        const project = await projectService.getProject(req.params.id, includeDeleted);
        if (project) {
            res.status(200).json(project); // 200 OK
        } else {
            res.status(404).json({ error: 'Project not found' }); // 404 Not Found
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
    }
};

// Update a specific project
export const updateProject = async (req, res) => {
    try {
        const updated = await projectService.updateProject(req.params.id, req.body);
        if (updated) {
            res.status(200).json({ message: 'Project updated successfully' }); // 200 OK
        } else {
            res.status(404).json({ error: 'Project not found' }); // 404 Not Found
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
    }
};

// Mark a project as deleted (does not physically delete it)
export const deleteProject = async (req, res) => {
    try {
        const deleted = await projectService.deleteProject(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Project deleted successfully' }); // 200 OK
        } else {
            res.status(404).json({ error: 'Project not found' }); // 404 Not Found
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
    }
};
