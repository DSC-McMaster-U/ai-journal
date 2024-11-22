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

// Controller for fetching a daily record by user id and date
const getDailyRecordByIdAndDate = async (req, res) => {
  try {
    const daily_record = await dailyRecordService.getDailyRecordByIdAndDate(req.params.user_id, req.params.date);
    res.json(daily_record);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch daily record" });
  }
};

// Controller for creating a new daily record
const createDailyRecord = async (req, res) => {
  const { user_id, date } = req.body;
  try {
    const newDailyRecord = await dailyRecordService.createDailyRecord(user_id, date);
    res.status(201).json({
      id: newDailyRecord.id,
      user_id: newDailyRecord.user_id,
      date: newDailyRecord.date,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create daily record" });
  }
};

module.exports = {
  getAllDailyRecords,
  getDailyRecordById,
  getDailyRecordByIdAndDate,
  createDailyRecord
};
