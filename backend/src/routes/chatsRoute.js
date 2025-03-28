const express = require('express');
const router = express.Router();

const chatsController = require('../controllers/chatsController');

router.get('/', chatsController.getChats);
router.post('/', chatsController.createChat);
router.put('/:instanceId', chatsController.editChat);
router.delete('/:instanceId', chatsController.deleteChat);
router.get('/test', chatsController.testFunctions);
router.get('/withlastmessage/', chatsController.getChatsWithLastMessage);

module.exports = router;
