const chatsService = require('../services/chatsService')

const getChats = async (req, res) => {
  try {
    const userId = req.token.user.id;
    const chats = await chatsService.getChats(userId)

    res.status(200).json({ data: chats });
  } catch (error) {
    console.log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
}

const createChat = async (req, res) => {
  try {
    const userid = req.token.user.id
    const { chatName = null } = req.body;
    
    const response = await chatsService.createChat(userId, chatName)
    res.status(200).json({ data: response });

  } catch (error) {
    console.log(`controller error: ${error.message}`);
    res.status(500).json({ error: 'failed to create chat' });
    
  }

}

const editChat = async (req, res) => {
  try {
    const { id } = req.params
    const { chatName, favourited } = req.body
    const response = await chatsService.editChat(id, chatName, favourited)
    res.status(200).json({ data: response })

  } catch (error) {
    console.log(`controller error: ${error.message}`);
    res.status(500).json({ error: 'failed to edit chat' });
  }
}

const deleteChat = async (req, res) => {
  try {
    const { id } = req.params
    const response = await chatsService.deleteChat(id)
    res.status(200).json({ data: response})

  } catch (error) {
    console.log(`controller error: ${error.message}`);
    res.status(500).json({ error: 'failed to delete chat' });
  }
}
 
module.exports = { getChats, createChat, editChat, deleteChat }
