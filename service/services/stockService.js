import Stock from '../models/stock.js';

// List all stocks, considering the filter for isDeleted
export const listStocks = async (includeDeleted = false) => {
    const condition = includeDeleted ? {} : { isDeleted: false };
    return await Stock.findAll({ where: condition });
};

// Create a new stock
export const createStock = async (stockData) => {
    const newStock = await Stock.create(stockData);
    return { stock: newStock, created: true };
};

// Get a specific stock by ID, considering the filter for isDeleted
export const getStock = async (id, includeDeleted = false) => {
    const condition = includeDeleted ? { id } : { id, isDeleted: false };
    return await Stock.findOne({ where: condition });
};

// Update an existing stock
export const updateStock = async (id, stockData) => {
    const existingStock = await Stock.findByPk(id);

    if (existingStock) {
        await Stock.update(stockData, { where: { id } });
        return { stock: await Stock.findByPk(id), updated: true };
    } else {
        throw new Error(`Stock with id ${id} not found`);
    }
};

// Create or update the stock based on its existence in the database
export const createOrUpdateStock = async (stockData) => {
    const existingStock = await Stock.findByPk(stockData.id);

    if (existingStock) {
        return await updateStock(stockData.id, stockData);
    } else {
        return await createStock(stockData);
    }
};

// Mark a stock as deleted (does not physically delete it)
export const deleteStock = async (id) => {
    const [updated] = await Stock.update(
        { isDeleted: true },
        { where: { id } }
    );
    return updated;
};

