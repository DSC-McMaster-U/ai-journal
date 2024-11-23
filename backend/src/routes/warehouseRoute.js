const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');

/**
 * @swagger
 * /api/warehouses:
 *   get:
 *     summary: Get all warehouses
 *     responses:
 *       200:
 *         description: A list of warehouses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Main Warehouse
 *                   location:
 *                     type: string
 *                     example: "123 Warehouse St."
 */
router.get('/', warehouseController.getAllWarehouses);

/**
 * @swagger
 * /api/warehouses/{id}:
 *   get:
 *     summary: Get a warehouse by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The warehouse ID
 *     responses:
 *       200:
 *         description: A single warehouse
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Main Warehouse
 *                 location:
 *                   type: string
 *                   example: "123 Warehouse St."
 *       404:
 *         description: Warehouse not found
 */
router.get('/:id', warehouseController.getWarehouseById);

module.exports = router;
