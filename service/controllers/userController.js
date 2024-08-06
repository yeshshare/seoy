import * as UserService from '../services/userService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secret = 'your_jwt_secret'; // Altere isso para uma variável de ambiente em produção

// Função para converter valores de query string para booleanos
const parseBoolean = (value) => {
    if (typeof value === 'boolean') return value; // Se o valor já é booleano, retorne-o
    if (value === 'true') return true; // Converte string 'true' para booleano true
    if (value === 'false') return false; // Converte string 'false' para booleano false
    return false; // Valor padrão se não for 'true' ou 'false'
};

// Função para registrar ou atualizar um usuário
export const register = async (req, res) => {
    const createOrUpdate = parseBoolean(req.query.createOrUpdate);

    try {
        console.log(req.query.createOrUpdate);
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Criptografa a password para segurança
        let user;

        if (createOrUpdate) {
            user = await UserService.createOrUpdateUser({ name, email, password: hashedPassword }); // Cria ou atualiza o usuário usando o Service
            res.status(201).json(user); // 201 Created
        } else {
            user = await UserService.createUser({ name, email, password: hashedPassword }); // Cria o usuário usando o Service
            res.status(201).json(user); // 201 Created
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message }); // Retorna erro com código 500
    }
};

// Função para realizar login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserService.getUserByEmail(email); // Encontra o usuário por e-mail no Service
        if (user && await bcrypt.compare(password, user.password)) { // Compara passwords para segurança
            const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
            const userWithToken = { ...user.get(), token };
            console.log(`user  : ${JSON.stringify(userWithToken)}`);
            res.json({ userWithToken }); // Envia o usuário logado
        } else {
            res.status(401).json({ message: 'Credenciais inválidas.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login', error: error.message }); // Retorna erro com código 500
    }
};

// Função para obter a lista de usuários
export const getUserList = async (req, res) => {
    const includeDeleted = parseBoolean(req.query.includeDeleted);

    try {
        const users = await UserService.getUsers(includeDeleted); // Obtem a lista de usuários do Service 
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar usuários', error: error.message });
    }
};

// Função para obter um usuário específico
export const getUser = async (req, res) => {
    const includeDeleted = parseBoolean(req.query.includeDeleted);

    try {
        const user = await UserService.getUserById(req.params.id, includeDeleted); // Obtém o usuário por ID no Service
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter usuário', error: error.message }); // Retorna erro com código 500
    }
};

// Função para atualizar um usuário
export const updateUser = async (req, res) => {
    try {
        const { password, ...userData } = req.body;

        if (password) {
            userData.password = await bcrypt.hash(password, 10); // Criptografa a password para segurança
        }

        const user = await UserService.updateUser(req.params.id, userData); // Atualiza o usuário no Service
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuário', error: error.message }); // Retorna erro com código 500
    }
};

// Função para deletar um usuário
export const deleteUser = async (req, res) => {
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
};
