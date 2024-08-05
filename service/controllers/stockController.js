import * as stockService from '../services/stockService.js';

// Função para converter valores de query string para booleanos
const parseBoolean = (value) => {
    if (typeof value === 'boolean') return value; // Se o valor já é booleano, retorne-o
    if (value === 'true') return true; // Converte string 'true' para booleano true
    if (value === 'false') return false; // Converte string 'false' para booleano false
    return false; // Valor padrão se não for 'true' ou 'false'
};

// Lista todos os estoques com opção de incluir deletados
export const listStocks = async (req, res) => {
    const includeDeleted = parseBoolean(req.query.includeDeleted);

    try {
        const stocks = await stockService.listStocks(includeDeleted);
        res.status(200).json(stocks); // 200 OK
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
    }
};

// Cria ou atualiza um estoque
export const createStock = async (req, res) => {
    const createOrUpdate = parseBoolean(req.query.createOrUpdate);

    try {
        const stockData = req.body;
        let result;

        if (createOrUpdate) {
            result = await stockService.createOrUpdateStock(stockData);
            res.status(201).json(result); // 201 Created
        } else {
            result = await stockService.createStock(stockData);
            res.status(201).json(result); // 201 Created
        }
    } catch (err) {
        res.status(500).json({ error: `Internal Server Error : ${err}` }); // 500 Internal Server Error
    }
};

// Obtém um estoque específico com opção de incluir deletados
export const getStock = async (req, res) => {
    const includeDeleted = parseBoolean(req.query.includeDeleted);

    try {
        const stock = await stockService.getStock(req.params.id, includeDeleted);
        if (stock) {
            res.status(200).json(stock); // 200 OK
        } else {
            res.status(404).json({ error: 'Stock not found' }); // 404 Not Found
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
    }
};

// Atualiza um estoque específico
export const updateStock = async (req, res) => {
    try {
        const updated = await stockService.updateStock(req.params.id, req.body);
        if (updated) {
            res.status(200).json({ message: 'Stock updated successfully' }); // 200 OK
        } else {
            res.status(404).json({ error: 'Stock not found' }); // 404 Not Found
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
    }
};

// Marca um estoque como deletado (não exclui fisicamente)
export const deleteStock = async (req, res) => {
    try {
        const deleted = await stockService.deleteStock(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Stock deleted successfully' }); // 200 OK
        } else {
            res.status(404).json({ error: 'Stock not found' }); // 404 Not Found
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' }); // 500 Internal Server Error
    }
};
