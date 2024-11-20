// services/dailyRecordService.js
const connection = require("../database");

// Fetch all daily records
const getAllDailyRecords = () => {
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

// Fetch daily record by ID
const getDailyRecordById = (id) => {
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
    getAllDailyRecords,
    getDailyRecordById,
};