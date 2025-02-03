const express = require('express');
const router = express.Router();
const chatLogsController = require('../controllers/chatLogsController');

/**
 * @swagger
 * /api/chat-logs/{id}:
 *   get:
 *     summary: Get all chat logs for a specific chat instance
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the chat instance to fetch logs for
 *     responses:
 *       200:
 *         description: A list of chat logs for the given chat instance
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
 *                   chat_instance_id:
 *                     type: integer
 *                     example: 10
 *                   is_user:
 *                     type: boolean
 *                     example: true
 *                   content:
 *                     type: string
 *                     example: "Hello, how are you?"
 *                   user_id:
 *                     type: string
 *                     format: uuid
 *                     example: "550e8400-e29b-41d4-a716-446655440000"
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-02-03T18:00:00Z"
 *       404:
 *         description: No chat logs found for this chat instance
 *       500:
 *         description: Failed to fetch chat logs
 */
router.get('/:id', chatLogsController.getChatLogsByInstanceId);

/**
 * @swagger
 * /api/chat-logs/{id}:
 *   post:
 *     summary: Create a new chat log entry for a specific chat instance
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the chat instance to which the chat log belongs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_user:
 *                 type: boolean
 *                 example: true
 *               content:
 *                 type: string
 *                 example: "This is a test message."
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       201:
 *         description: Chat log created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 chat_instance_id:
 *                   type: integer
 *                   example: 10
 *                 is_user:
 *                   type: boolean
 *                   example: true
 *                 content:
 *                   type: string
 *                   example: "This is a test message."
 *                 user_id:
 *                   type: string
 *                   format: uuid
 *                   example: "550e8400-e29b-41d4-a716-446655440000"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-02-03T18:00:00Z"
 *       500:
 *         description: Failed to create chat log
 */
router.post('/:id', chatLogsController.createChatLogForInstance);

module.exports = router;
