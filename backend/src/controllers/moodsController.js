const moodsService = require("../services/moodsService");

// Controller to get all mood entries
const getAllMoods = async (req, res) => {
  try {
    const moods = await moodsService.getAllMoods();
    res.json(moods);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch mood entries"});
  }
};

// Get mood entries by user ID
const getMoodByUserId = async (req, res) => {
    //const { usersId } = req.params;
    try {
      const moods = await moodService.getMoodByUserId(req.params.usersId);
      if (moods.length > 0) {
        res.json(moods);
      } else {
        res.status(404).json({ message: "No mood entries found for this user" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch mood entries" });
    }
};

// Get mood entries by daily record ID
const getMoodByDailyId = async (req, res) => {
    try {
      const moods = await moodService.getMoodByUserId(req.params.dailyRecordId);
      if (moods.length > 0) {
        res.json(moods);
      } else {
        res.status(404).json({ message: "No mood entries found for this day" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch mood entries" });
    }
};

// Controller to get mood entries by ID
const getMoodById = async (req, res) => {
  try {
    //const { id } = req.params;
    const mood = await moodsService.getMoodById(req.params.id);
    if (mood.length > 0) {
        res.json(moods);
    } else {
        res.status(404).json({ message: "No mood entry found for this id" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch mood entry" });
  }
};

// Controller to create a new mood entry
// Create a new mood entry
const createMood = async (req, res) => {
    const moodData = req.body;
    try {
      const result = await moodService.createMood(moodData);
      res.status(201).json({ message: "Mood entry created successfully", result });
    } catch (error) {
      res.status(500).json({ error: "Failed to create mood entry"});
    }
};

// Update a mood entry
const updateMood = async (req, res) => {
    const { id } = req.params;
    const updatedMoods = req.body;
    try {
      const result = await moodService.updateMood(id, updatedMoods);
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Mood updated successfully" });
      } else {
        res.status(404).json({ message: "Mood not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update mood" });
    }
};
  
  // Delete a mood entry
  const deleteMood = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await moodService.deleteMood(id);
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Mood deleted successfully" });
      } else {
        res.status(404).json({ message: "Mood entry not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete mood"});
    }
  };

module.exports = {
  getAllMoods,
  getMoodByUserId,
  getMoodByDailyId,
  getMoodById,
  createMood,
  updateMood,
  deleteMood,
};