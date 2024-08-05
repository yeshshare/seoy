import User from '../models/user.js';

// Create a new user
export const createUser = async (data) => {
    const newUser = await User.create(data);
    return { user: newUser, created: true };
};

// Get a user by email, considering the filter for isDeleted
export const getUserByEmail = async (email, includeDeleted = false) => {
    const condition = includeDeleted ? { email } : { email, isDeleted: false };
    return await User.findOne({ where: condition });
};

// Get a user by ID, considering the filter for isDeleted
export const getUserById = async (id, includeDeleted = false) => {
    const condition = includeDeleted ? { id } : { id, isDeleted: false };
    return await User.findOne({ where: condition });
};

// Update an existing user
export const updateUser = async (id, data) => {
    const existingUser = await User.findByPk(id);

    if (existingUser) {
        await User.update(data, { where: { id } });
        return { user: await User.findByPk(id), updated: true };
    } else {
        throw new Error(`User with id ${id} not found`);
    }
};

// Create or update the user based on its existence in the database
export const createOrUpdateUser = async (data) => {
    const existingUser = await User.findByPk(data.id);

    if (existingUser) {
        return await updateUser(data.id, data);
    } else {
        return await createUser(data);
    }
};

// Mark a user as deleted (does not physically delete it)
export const deleteUser = async (id) => {
    const [updated] = await User.update(
        { isDeleted: true },
        { where: { id } }
    );
    return updated;
};
