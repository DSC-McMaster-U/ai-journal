// controllers/dailyRecordController.js
const dailyRecordService = require('../services/dailyRecordService.js');

// Controller for fetching all the user's daily records
const getAllDailyRecords = async (req, res) => {
  try {
    const userId = req.token.user.id;
    const daily_records = await dailyRecordService.getAllDailyRecords(userId);
    if (!Array.isArray(daily_records) || daily_records.length === 0) {
      return res
        .status(404)
        .json({ error: 'No daily records found for this user' });
    }
    res.json(daily_records);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch daily records' });
  }
};

// Controller for fetching the user's daily record for the current date
const getDailyRecord = async (req, res) => {
  try {
    const userId = req.token.user.id;
    const daily_record = await dailyRecordService.getDailyRecord(userId);
    if (!Array.isArray(daily_record) || daily_record.length === 0) {
      return res.status(404).json({ error: 'No daily record found for today' });
    }
    res.json(daily_record);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch daily record' });
  }
};

module.exports = {
  getAllDailyRecords,
  getDailyRecord,
};
