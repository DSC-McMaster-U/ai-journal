const dailyRecordService = require('../services/dailyRecordService');
const { connection } = require('../database');
const { log } = require('../logger');

const dailyRecordMiddleware = async (req, res, next) => {
  try {
    const userId = '108188107816093538321'; // TODO replace

    // Check if a daily record exists for this user and the current date
    let dailyRecord = await dailyRecordService.getDailyRecord(userId);

    // Create the daily record if it doesn't exist
    if (!dailyRecord || dailyRecord.length === 0) {
      await new Promise((resolve, reject) => {
        connection.query(
          'INSERT INTO daily_records (date, user_id) VALUES (CURDATE(), ?);',
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

      dailyRecord = await dailyRecordService.getDailyRecord(userId);
    }

    req.dailyRecord = dailyRecord[0]; // Attach the daily record to the request object for later user
    next(); // pass control to the next middleware
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error processing daily record.' });
  }
};

module.exports = dailyRecordMiddleware;
