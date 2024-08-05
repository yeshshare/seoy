import express from 'express';
import http from 'http';
import { Server as socketIoServer } from 'socket.io'; // Importação nomeada
import bodyParser from 'body-parser';
import cors from 'cors';

// Criação da aplicação Express
const app = express();
const server = http.createServer(app);
const io = new socketIoServer(server); // Criação do servidor Socket.io

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Importação de rotas
import estoqueRoutes from './routes/estoqueRoutes.js';
import ordemRoutes from './routes/ordemRoutes.js';
import projetoRoutes from './routes/projetoRoutes.js';
import movimentacaoRoutes from './routes/movimentacaoRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

// Uso das rotas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/estoques', estoqueRoutes);
app.use('/api/ordens', ordemRoutes);
app.use('/api/projetos', projetoRoutes);
app.use('/api/movimentacoes', movimentacaoRoutes);


// Configuração do WebSocket
io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    socket.on('movimentacao', (data) => {
        console.log('Movimentação recebida:', data);
        io.emit('movimentacaoAtualizada', data);
    });

    socket.on('ordemServico', (data) => {
        console.log('Ordem de Serviço recebida:', data);
        io.emit('ordemServicoAtualizada', data);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Definindo a porta e iniciando o servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
