// controllers/daily_recordController.js
const daily_recordService = require("../services/daily_recordService.js");

// Controller for fetching all daily records
const getAllDaily_Records = async (req, res) => {
  try {
    const daily_records = await daily_recordService.getAllDaily_Records();
    res.json(daily_records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch daily records" });
  }
};

// Controller for fetching a daily record by ID
const getDaily_RecordById = async (req, res) => {
  try {
    const daily_record = await daily_recordService.getDaily_RecordById(req.params.id);
    res.json(daily_record);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch daily record" });
  }
};

module.exports = {
  getAllDaily_Records,
  getDaily_RecordById,
};
