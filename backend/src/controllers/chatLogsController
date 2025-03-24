const chatMessagesService = require('../services/chatLogsService');

const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.token.user.id;

    // Ensuring the user is authorized to view messages from this chat instance
    const isAuthorized = await chatMessagesService.verifyChatOwnership(chatId, userId);
    if (!isAuthorized) {
      return res.status(403).json({ error: 'Unauthorized access to chat messages' });
    }

    const messages = await chatMessagesService.getMessages(chatId);
    res.status(200).json({ data: messages });
  } catch (error) {
    console.log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.token.user.id;
    const { content, is_user } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    // Ensure the user is authorized to send messages in this chat instance
    const isAuthorized = await chatMessagesService.verifyChatOwnership(chatId, userId);
    if (!isAuthorized) {
      return res.status(403).json({ error: 'Unauthorized to send messages in this chat' });
    }

    const response = await chatMessagesService.sendMessage(chatId, userId, content, is_user);
    res.status(201).json({ data: response });
  } catch (error) {
    console.log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

module.exports = { getMessages, sendMessage };
