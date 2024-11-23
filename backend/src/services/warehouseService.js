// services/warehouseService.js
const { connection } = require("../database");

// Fetch all warehouses
const getAllWarehouses = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM `ai-journal`.`warehouses`",
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

// Fetch warehouse by ID
const getWarehouseById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM `ai-journal`.`warehouses` WHERE id = ?",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

module.exports = {
  getAllWarehouses,
  getWarehouseById,
};
