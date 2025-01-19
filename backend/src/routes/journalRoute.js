const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');

/**
 * @swagger
 * /api/journals/daily:
 *   post:
 *     summary: Create a daily journal entry
 *     description: Creates a new daily journal entry linked to the current daily record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the journal entry
 *               content:
 *                 type: object
 *                 description: The content of the journal entry
 *     responses:
 *       201:
 *         description: Journal created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 content:
 *                   type: object
 *                 userId:
 *                   type: string
 *                 dailyRecordId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       409:
 *         description: A daily journal already exists for this record
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/daily', journalController.createDailyJournal);

/**
 * @swagger
 * /api/journals:
 *   post:
 *     summary: Create a journal entry under a tab
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - tabId
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the journal entry
 *               content:
 *                 type: object
 *                 description: The content of the journal entry
 *               tabId:
 *                 type: integer
 *                 description: The ID of the tab to create the journal under
 *     responses:
 *       201:
 *         description: Journal created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 content:
 *                   type: object
 *                 userId:
 *                   type: string
 *                 tabId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/', journalController.createTabJournal);

/**
 * @swagger
 * /api/journals/{id}:
 *   put:
 *     summary: Update journal metadata
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The journal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title for the journal entry
 *               tabId:
 *                 type: integer
 *                 description: The new tab ID (optional, not allowed for daily journals)
 *     responses:
 *       200:
 *         description: Journal updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 tabId:
 *                   type: integer
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid request (missing title or attempting to modify daily journal tab)
 *       404:
 *         description: Journal not found
 *       500:
 *         description: Server error
 */
router.put('/:id', journalController.updateJournalInfo);

/**
 * @swagger
 * /api/journals/{id}:
 *   delete:
 *     summary: Delete a journal entry
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The journal ID
 *     responses:
 *       200:
 *         description: Journal deleted successfully
 *       404:
 *         description: Journal not found or unauthorized
 *       500:
 *         description: Server error
 */
router.delete('/:id', journalController.deleteJournal);

module.exports = router;