const { executeQuery } = require('../utils/query');

const getChats = (userId) => {
  const query =
    'SELECT * FROM `ai-journal`.`chat_instances` ' + 'WHERE user_id = ?';
  return executeQuery(query, [userId]);
};

const createChat = async (userId, chatName) => {
  let query;
  let values;

  if (chatName !== null) {
    query =
      'INSERT INTO `ai-journal`.`chat_instances` (user_id, chat_name) VALUES (?, ?)';
    values = [userId, chatName];
  } else {
    query = 'INSERT INTO `ai-journal`.`chat_instances` (user_id) VALUES (?)';
    values = [userId];
  }

  return await executeQuery(query, values);
};

const editChat = (instanceId, chatName, favourited) => {
  const query =
    'UPDATE `ai-journal`.`chat_instances` ' +
    'SET chat_name = ?, favorited = ? ' +
    'WHERE id = ?';
  return executeQuery(query, [chatName, favourited, instanceId]);
};

const deleteChat = (instanceId) => {
  const query = 'DELETE FROM `ai-journal`.`chat_instances` ' + 'WHERE id = ?';
  return executeQuery(query, [instanceId]);
};

const getChatsWithLastMessage = (userId) => {
  //Dont ask
  const query =
    'WITH chat_with_msgs AS ( ' +
    'SELECT I.id as id, I.user_id as user_id, I.created_at as created_at,  ' +
    'L.created_at as message_time, L.is_user as is_user,  ' +
    'L.id as msg_id, L.content as content,  ' +
    'I.chat_name as chat_name, favorited ' +
    'FROM chat_instances AS I ' +
    'LEFT JOIN chat_logs as L ON I.id = L.chat_instance_id ' +
    'WHERE I.user_id = ? ' +
    '), not_latest AS ( ' +
    'SELECT L.id, L.user_id, L.created_at, L.is_user, L.msg_id, L.content, L.chat_name, L.favorited ' +
    'FROM chat_with_msgs as L ' +
    'INNER JOIN chat_with_msgs as R ON L.id = R.id ' +
    'WHERE L.message_time < R.message_time ' +
    ') ' +
    'SELECT *,  ' +
    'CASE ' +
    'WHEN message_time is NULL or created_at > message_time THEN created_at ' +
    'ELSE message_time ' +
    'END AS latest_time  ' +
    'FROM chat_with_msgs WHERE msg_id IS NULL or  ' +
    'msg_id NOT IN (SELECT DISTINCT msg_id FROM not_latest) ' +
    'ORDER BY latest_time DESC; ';

  return executeQuery(query, [userId]);
};

module.exports = {
  getChats,
  createChat,
  editChat,
  deleteChat,
  getChatsWithLastMessage,
};
