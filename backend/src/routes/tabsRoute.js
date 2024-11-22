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
 *                     type: timestamp
 *                     format: date-time
 *                     example: "2021-09-21T21:00:00.000Z"
 *                   user_id:
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
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Tab 1"
 *                 createdAt:
 *                   type: timestamp
 *                   format: date-time
 *                   example: "2021-09-21T21:00:00.000Z"
 *                 user_id:
 *                   type: string
 *                   example: "1"
 *       404:
 *         description: Tab not found
 */
router.get('/:id', tabsController.getTabById);

/**
 * @swagger
 * /api/tabs:
 *   post:
 *     summary: Create a new tab
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "New Tab"
 *               user_id:
 *                 type: string
 *                 example: "user123"
 *     responses:
 *       201:
 *         description: Tab created successfully
 *       500:
 *         description: Failed to create tab
 */
router.post('/', tabsController.createTab);

/**
 * @swagger
 * /api/tabs/{id}:
 *   put:
 *     summary: Update an existing tab
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tab ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Tab Name"
 *     responses:
 *       200:
 *         description: Tab updated successfully
 *       500:
 *         description: Failed to update tab
 */
router.put('/:id', tabsController.updateTab);

/**
 * @swagger
 * /api/tabs/{id}:
 *   delete:
 *     summary: Delete a tab
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tab ID
 *     responses:
 *       200:
 *         description: Tab deleted successfully
 *       500:
 *         description: Failed to delete tab
 */
router.delete('/:id', tabsController.deleteTab);

module.exports = router;
