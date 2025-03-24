const express = require('express');
const router = express.Router();

const chatLogsController = require('../controllers/chatLogsController');

router.get('/:chatId', chatLogsController.getMessages);
router.post('/:chatId', chatLogsController.sendMessage);

module.exports = router;
