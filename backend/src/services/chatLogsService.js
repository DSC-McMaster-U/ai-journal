const { executeQuery } = require('../utils/query');

const getChatLogsByInstanceId = (chatInstanceId, userId) => {
  const query = `
    SELECT * FROM chat_logs 
    WHERE chat_instance_id = ? 
      AND user_id = ? 
    ORDER BY created_at ASC`;

  return executeQuery(query, [chatInstanceId, userId]);
};

const createChatLog = (chatInstanceId, userId, isUser, content) => {
  const query = `
    INSERT INTO chat_logs (chat_instance_id, user_id, is_user, content) 
    VALUES (?, ?, ?, ?)`;

  return executeQuery(query, [chatInstanceId, userId, isUser, content]);
};

module.exports = {
  getChatLogsByInstanceId,
  createChatLog,
};
