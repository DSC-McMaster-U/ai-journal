// controllers/dailyRecordController.js
const dailyRecordService = require("../services/dailyRecordService.js");

// Controller for fetching all daily records
const getAllDailyRecords = async (req, res) => {
  try {
    const daily_records = await dailyRecordService.getAllDailyRecords();
    res.json(daily_records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch daily records" });
  }
};

// Controller for fetching a daily record by ID
const getDailyRecordById = async (req, res) => {
  try {
    const daily_record = await dailyRecordService.getDailyRecordById(req.params.id);
    res.json(daily_record);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch daily record" });
  }
};

module.exports = {
  getAllDailyRecords,
  getDailyRecordById,
};
