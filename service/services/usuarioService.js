// services/usuarioService.js
import Usuario from '../models/usuarios.js';

class UsuarioService {
    async createUser(data) {
        return await Usuario.create(data);
    }

    async getUserByEmail(email) {
        return await Usuario.findOne({ where: { email } });
    }

    async getUserById(id) {
        return await Usuario.findByPk(id);
    }

    async updateUser(id, data) {
        const user = await Usuario.findByPk(id);
        if (user) {
            return await user.update(data);
        }
        return null;
    }

    async deleteUser(id) {
        const user = await Usuario.findByPk(id);
        if (user) {
            return await user.destroy();
        }
        return null;
    }
}

export default new UsuarioService();
