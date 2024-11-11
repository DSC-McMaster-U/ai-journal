// controllers/warehouseController.js
const warehouseService = require("../services/warehouseService");

// Controller for fetching all warehouses
const getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await warehouseService.getAllWarehouses();
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch warehouses" });
  }
};

// Controller for fetching a warehouse by ID
const getWarehouseById = async (req, res) => {
  try {
    const warehouse = await warehouseService.getWarehouseById(req.params.id);
    res.json(warehouse);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch warehouse" });
  }
};

module.exports = {
  getAllWarehouses,
  getWarehouseById,
};
