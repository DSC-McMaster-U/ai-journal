const moodService = require("../services/moodService");

const getMoodEntries = async (req, res) => {
  //TODO: Get the moods for the specific user
  try {
    const result = await moodService.getMoodEntries();
    res.status(201).json({ data: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve mood entries" });
  }
};

// TODO: get moods for specific user for this current dailyrecord

const createMoodEntry = async (req, res) => {
  //TODO: get userid and dailyrecordid from middleware in the future
  const { userId, moodId, dailyRecordId } = req.body;

  if (!userId || !moodId || !dailyRecordId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // TODO: Make result return the created mood entry
  try {
    const result = await moodService.createMoodEntry(
      userId,
      moodId,
      dailyRecordId
    );
    res.status(201).json({ message: "Mood entry created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create mood entry" });
  }
};

const editMoodEntry = async (req, res) => {
  const { id } = req.params;
  const { moodId } = req.body;
  // TODO check if userid matches the user id of the mood entry

  // TODO: Make result return the edited mood entry
  try {
    const result = await moodService.editMoodEntry(id, moodId);
    res.status(200).json({ message: "Mood entry updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update mood entry" });
  }
};

const deleteMoodEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await moodService.deleteMoodEntry(id);
    res.status(200).json({ message: "Mood entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete mood entry" });
  }
};

module.exports = {
  getMoodEntries,
  createMoodEntry,
  editMoodEntry,
  deleteMoodEntry,
};
