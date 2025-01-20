const { connection } = require('../database');

const getAllTabs = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM `ai-journal`.`tabs` WHERE user_id = ?',
      [userId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const getTabById = (id, userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM `ai-journal`.`tabs` WHERE id = ? AND user_id = ?',
      [id, userId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const createTab = (name, userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO `ai-journal`.`tabs` (name, user_id) VALUES (?, ?)',
      [name, userId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const updateTab = (id, name, userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE `ai-journal`.`tabs` SET name = ? WHERE id = ? AND user_id = ?',
      [name, id, userId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const deleteTab = (id, userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'DELETE FROM `ai-journal`.`tabs` WHERE id = ? AND user_id = ?',
      [id, userId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

module.exports = {
  getAllTabs,
  getTabById,
  createTab,
  updateTab,
  deleteTab,
};
