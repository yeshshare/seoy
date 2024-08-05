// controllers/usuarioController.js
import UsuarioService from '../services/usuarioService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secret = 'your_jwt_secret'; // Altere isso para uma variável de ambiente em produção

class UsuarioController {
    async register(req, res, next) {
        try {
            const { nome, email, senha } = req.body;
            const hashedPassword = await bcrypt.hash(senha, 10);
            const user = await UsuarioService.createUser({ nome, email, senha: hashedPassword });
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, senha } = req.body;
            const user = await UsuarioService.getUserByEmail(email);
            if (user && await bcrypt.compare(senha, user.senha)) {
                const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
                user.token = token;
                res.json({ user });
            } else {
                res.status(401).json({ message: 'Credenciais inválidas' });
            }
        } catch (error) {
            next(error);
        }
    }

    async getUser(req, res, next) {
        try {
            const user = await UsuarioService.getUserById(req.params.id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req, res, next) {
        try {
            const user = await UsuarioService.updateUser(req.params.id, req.body);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const user = await UsuarioService.deleteUser(req.params.id);
            if (user) {
                res.json({ message: 'Usuário deletado com sucesso' });
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            next(error);
        }
    }
}

export default new UsuarioController();
