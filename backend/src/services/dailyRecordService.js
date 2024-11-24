// services/dailyRecordService.js
const { connection } = require("../database");

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

// Fetch daily record by user_id and date
const getDailyRecordByIdAndDate = (id, date) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM daily_records WHERE user_id = ? AND date = ?",
      [id, date],
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

// Create daily record
const createDailyRecord = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO daily_records (date, user_id) VALUES (CURDATE(), ?);",
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
  getDailyRecordByIdAndDate,
  createDailyRecord,
};
