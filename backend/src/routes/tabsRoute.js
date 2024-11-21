const express = require('express');
const router = express.Router();
const tabsController = require('../controllers/tabsController');

/**
 * @swagger
 * /api/tabs:
 *   get:
 *     summary: Get all tabs
 *     responses:
 *       200:
 *         description: A list of tabs
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
 *                     example: "Tab 1"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2021-09-21T21:00:00.000Z"
 *                   userId:
 *                     type: string
 *                     example: "1"
 */
router.get('/', tabsController.getAllTabs);

/**
 * @swagger
 * /api/tabs/{id}:
 *   get:
 *     summary: Get a tab by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tab ID
 *     responses:
 *       200:
 *         description: A single tab
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Tab 1"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2021-09-21T21:00:00.000Z"
 *                 userId:
 *                   type: string
 *                   example: "1"
 *       404:
 *         description: Tab not found
 */
router.get('/:id', tabsController.getTabById);

module.exports = router;
