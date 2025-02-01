const express = require('express');
const router = express.Router();

const chatsController = require('../controllers/chatsController')

router.get('/', chatsController.getChats)
router.post('/', chatsController.createChat)
router.put('/:id', chatsController.editChat)
router.delete('/:id', chatsController.deleteChat)
 
module.exports = router;
