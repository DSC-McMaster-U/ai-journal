const { executeQuery } = require('../utils/query');

const getAllTabs = (userId) => {
  const query = 'SELECT * FROM `ai-journal`.`tabs` WHERE user_id = ?';
  return executeQuery(query, [userId]);
};

const getTabById = (id, userId) => {
  const query =
    'SELECT * FROM `ai-journal`.`tabs` WHERE id = ? AND user_id = ?';
  return executeQuery(query, [id, userId]);
};

const createTab = (name, userId, color) => {
  const query =
    'INSERT INTO `ai-journal`.`tabs` (name, user_id, color) VALUES (?, ?, ?)';
  return executeQuery(query, [name, userId, color]);
};

const updateTab = (id, name, userId, color) => {
  const query =
    'UPDATE `ai-journal`.`tabs` SET name = ?, color = ? WHERE id = ? AND user_id = ?';
  return executeQuery(query, [name, color, id, userId]);
};

const deleteTab = (id, userId) => {
  const query = 'DELETE FROM `ai-journal`.`tabs` WHERE id = ? AND user_id = ?';
  return executeQuery(query, [id, userId]);
};

module.exports = {
  getAllTabs,
  getTabById,
  createTab,
  updateTab,
  deleteTab,
};
