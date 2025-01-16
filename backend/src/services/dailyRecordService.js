// services/dailyRecordService.js
const { connection } = require("../database");

// Fetch all daily records for the current user
const getAllDailyRecords = (userId) => { 
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM `ai-journal`.`daily_records` WHERE user_id = ?",
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

// Fetch the user's daily record for the current date
const getDailyRecord = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM `ai-journal`.`daily_records` WHERE user_id = ? AND date = CURDATE()",
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

module.exports = {
  getAllDailyRecords,
  getDailyRecord
};
