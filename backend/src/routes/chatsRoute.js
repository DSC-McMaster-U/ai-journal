const express = require('express');
const router = express.Router();

const chatsController = require('../controllers/chatsController')

router.get('/chats/:chatID', chatsController.getChatById)
router.post('/chats', chatsController.createChat)
router.put('/chats/:chatID', chatsController.editChat)
router.delete('/chats/:chatID', chatsController.deleteChat)
 
module.exports = router;
