const { connection } = require('../database');

const getAllTabs = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM `ai-journal`.`tabs`', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getTabById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM `ai-journal`.`tabs` WHERE id = ?',
      [id],
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

const updateTab = (id, name) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE `ai-journal`.`tabs` SET name = ? WHERE id = ?',
      [name, id],
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

const deleteTab = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'DELETE FROM `ai-journal`.`tabs` WHERE id = ?',
      [id],
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
