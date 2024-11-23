// include functions from moodService.js
const moodService = require("../services/moodService");

// controller for creating a mood entry
const createMoodEntry = async (req, res) => {
    // extract user values from http request body
    const { userId, moodId, dailyRecordId } = req.body;

    // Validate that all required fields are present
    if (!userId || !moodId || !dailyRecordId) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // try creating a mood entry using extracted data
    try {
        const result = await moodService.createMoodEntry(userId, moodId, dailyRecordId);
        res.status(201).json({ message: "Mood entry created successfully", data: result });
    }
    // catch errors that occur in entry creation
    catch (error) {
        res.status(500).json({ error: "Failed to create mood entry" });
    }
};

// controller for editing an existing mood entry
const editMoodEntry = async (req, res) => {
    // get id from http request url
    const { id } = req.params;
    // extract user values from http request body
    const { userId, moodId, dailyRecordId } = req.body;
    // try updating the mood using extracted data
    try {
        const result = await moodService.editMoodEntry(id, userId, moodId, dailyRecordId);
        res.status(200).json({ message: "Mood entry updated successfully", data: result });
    }
    // catch error if occurs in editing an entry
    catch (error) {
        res.status(500).json({ error: "Failed to update mood entry" });
    }
};

// Controller for deleting a mood entry
const deleteMoodEntry = async (req, res) => {
    // get id from http request url
    const { id } = req.params;
    // try deleting a mood entry using extracted data
    try {
        const result = await moodService.deleteMoodEntry(id);
        res.status(200).json({ message: "Mood entry deleted successfully", data: result });
    } 
    // catch error if occurs in entry deletion
    catch (error) {
        res.status(500).json({ error: "Failed to delete mood entry" });
    }
};

module.exports = {
  createMoodEntry,
  editMoodEntry,
  deleteMoodEntry,
};
