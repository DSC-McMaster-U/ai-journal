const { executeQuery } = require('../utils/query');


const getChats = (userId) => {
  const query =
    'SELECT * FROM `ai-journal`.`chat_instances` ' +
    'WHERE user_id = ?'
  return executeQuery(query, [userId])
}

const createChat = (userId, chatName = null) => {
  let query;
  let values;

  if (chatName) {
    query = 'INSERT INTO `ai-journal`.`chat_instances` (user_id, chat_name) VALUES (?, ?)';
    values = [userId, chatName]
  } else { 
    query = 'INSERT INTO `ai-journal`.`chat_instances` (user_id) VALUES (?)';
    values = [userId]
  }
  return executeQuery(query, values)

}

const editChat = (instanceId, chatName, favourited ) => {
  const query =  
    'UPDATE `ai-journal`.`chat_instances` ' + 
    'SET chat_name = ?, favorited = ? ' +
    'WHERE id = ?';
  return executeQuery(query, [chatName, favourited, instanceId])

}

const deleteChat =  (instanceId) => {
  const query =  
    'DELETE FROM `ai-journal`.`chat_instances` ' + 
    'WHERE id = ?';
  return executeQuery(query, [instanceId])
}
 
module.exports = { getChats, createChat, editChat, deleteChat }
