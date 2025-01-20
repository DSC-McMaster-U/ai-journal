const { connection } = require('../database');
const { log } = require('../logger');

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

const createTab = (name, userId, color) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO `ai-journal`.`tabs` (name, user_id, color) VALUES (?, ?, ?)',
      [name, userId, color],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id: results.insertId, name, user_id: userId, color });
        }
      }
    );
  });
};

const updateTab = (id, name, userId, color) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE `ai-journal`.`tabs` SET name = ?, color = ? WHERE id = ? AND user_id = ?',
      [name, color, id, userId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.affectedRows === 0) {
            reject({ message: 'Tab not found' });
          }

          resolve({ id: +id, name, user_id: userId, color });
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
          if (results.affectedRows === 0) {
            reject({ message: 'Tab not found' });
          }

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
