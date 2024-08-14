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
import stockRoutes from './routes/stockRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import movementRoutes from './routes/movementRoutes.js';
import userRoutes from './routes/userRoutes.js';
import equipamentRoutes from './routes/equipamentRoute.js';
import categoryRoutes from './routes/categoryRoutes.js'
import subcategoryRoutes from './routes/subcategoryRoutes.js'

// Uso das rotas
app.use('/api/users', userRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/movements', movementRoutes);
app.use('/api/equipaments', equipamentRoutes);
app.use('/api/categorys', categoryRoutes);
app.use('/api/subcategorys', subcategoryRoutes);



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
