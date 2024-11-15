// services/daily_recordService.js
const connection = require("../database");

// Fetch all daily records
const getAllDaily_Records = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM `ai-journal`.`daily_records`",
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

// Fetch daily_record by ID
const getDaily_RecordById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM `ai-journal`.`daily_records` WHERE id = ?",
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
    getAllDaily_Records,
    getDaily_RecordById,
};
