const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

/**
 * @swagger
 * /api/chatbot:
 *   post:
 *     summary: recieve response from ai 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "I feel depressed, what are some fun activities I can do?"
 *     responses:
 *       200:
 *         description: the chatbot's response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "Everyone goes through hard times, here are some . . ."
 *       500:
 *         description: error generating response
 */
router.post('/', chatbotController.getChatbotResponse);

module.exports = router;
