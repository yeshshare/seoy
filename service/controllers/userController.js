import * as UserService from '../services/userService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secret = 'your_jwt_secret'; // Altere isso para uma variável de ambiente em produção

class UserController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10); // Criptografa a password para segurança
            const user = await UserService.createUser({ name, email, password: hashedPassword }); // Cria o usuário usando o Service
            res.status(201).json(user); // Envia o usuário criado para o cliente
        } catch (error) {
            res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message }); // Retorna erro com código 500
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserService.getUserByEmail(email); // Encontra o usuário por e-mail no Service
            if (user && await bcrypt.compare(password, user.password)) { // Compara passwords para segurança
                const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
                user.token = token; // Adiciona o token aos dados do usuário
                res.json({ user }); // Envia o usuário logado
            } else {
                res.status(401).json({ message: 'Credenciais inválidas.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao fazer login', error: error.message }); // Retorna erro com código 500
        }
    }

    async getUser(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id); // Obtém o usuário por ID no Service
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter usuário', error: error.message }); // Retorna erro com código 500
        }
    }

    async updateUser(req, res) {
        try {
            const user = await UserService.updateUser(req.params.id, req.body); // Atualiza o usuário no Service
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar usuário', error: error.message }); // Retorna erro com código 500
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await UserService.deleteUser(req.params.id); // Marca o usuário como excluído no Service
            if (user) {
                res.json({ message: 'Usuário excluído com sucesso!' });
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir usuário', error: error.message }); // Retorna erro com código 500
        }
    }
}

export default new UserController();
