const { connection } = require('../database');
const { log } = require('../logger');

const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, results) => {
      if (error) {
        log(`Database Error: ${error.message}`, { query, params });
        reject(new Error('Database query failed'));
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = { executeQuery };
