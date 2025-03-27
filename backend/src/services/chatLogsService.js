const { executeQuery } = require('../utils/query');

const getMessages = (chatId) => {
  const query =
    'SELECT * FROM `ai-journal`.`chat_logs` ' +
    'WHERE chat_instance_id = ? ORDER BY created_at ASC';
  return executeQuery(query, [chatId]);
};

const sendMessage = (chatId, userId, content, isUser) => {
  const query =
    'INSERT INTO `ai-journal`.`chat_logs` (chat_instance_id, user_id, content, is_user) ' +
    'VALUES (?, ?, ?, ?)';
  return executeQuery(query, [chatId, userId, content, isUser]);
};

// Verifies that the user owns the chat instance to prevent unauthorized access
const verifyChatOwnership = async (chatId, userId) => {
  const query =
    'SELECT COUNT(*) AS count FROM `ai-journal`.`chat_instances` ' +
    'WHERE id = ? AND user_id = ?';
  const result = await executeQuery(query, [chatId, userId]);
  return result[0].count > 0;
};

module.exports = { getMessages, sendMessage, verifyChatOwnership };
