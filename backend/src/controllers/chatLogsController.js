const { log } = require('../logger');
const chatLogsService = require('../services/chatLogsService');

const getChatLogsByInstanceId = async (req, res) => {
  try {
    const userId = '102072085857574424342';
    const chatLogInstanceId = req.params.id;

    const chatLogs = await chatLogsService.getChatLogsByInstanceId(
      chatLogInstanceId,
      userId
    );

    res.status(200).json({ data: chatLogs });
  } catch (error) {
    log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch chat logs by ID' });
  }
};

const createChatLogForInstance = async (req, res) => {
  try {
    const { isUser, content } = req.body;
    const chatLogInstanceId = req.params.id;
    const userId = '102072085857574424342';

    const response = await chatLogsService.createChatLog(
      chatLogInstanceId,
      userId,
      isUser,
      content
    );

    res.status(201).json({
      data: {
        id: response.insertId,
        chat_instance_id: chatLogInstanceId,
        user_id: userId,
        is_user: isUser,
        content,
      },
    });
  } catch (error) {
    log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to create chat log' });
  }
};

module.exports = {
  getChatLogsByInstanceId,
  createChatLogForInstance,
};
