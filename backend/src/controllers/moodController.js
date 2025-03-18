const { log } = require('../logger');
const moodService = require('../services/moodService');

const getMoodEntries = async (req, res) => {
  try {
    const userId = req.token.user.id;
    const result = await moodService.getMoodEntries(userId);

    res.status(200).json({ data: result });
  } catch (error) {
    log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to retrieve mood entries' });
  }
};

const getMoodEntriesToday = async (req, res) => {
  try {
    const userId = req.token.user.id;
    const result = await moodService.getMoodEntriesToday(userId);

    res.status(200).json({ data: result });
  } catch (error) {
    log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to retrieve mood entries' });
  }
}

const createMoodEntry = async (req, res) => {
  try {
    const userId = req.token.user.id;
    const dailyRecordId = req.dailyRecord.id;
    const { moods } = req.body;

    if (!userId || !moods || !dailyRecordId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await moodService.createMoodEntry(userId, moods, dailyRecordId);

    res.status(201).json({ data: result});
  } catch (error) {
    log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to create mood entry' });
  }
};

const editMoodEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { moodId } = req.body;
    const userId = req.token.user.id;

    const result = await moodService.editMoodEntry(id, moodId, userId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Mood entry not found' });
    }

    res.status(200).json({
      data: {
        id,
        mood_id: moodId,
        user_id: userId,
      },
    });
  } catch (error) {
    log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to update mood entry' });
  }
};

const deleteMoodEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.token.user.id;

    const result = await moodService.deleteMoodEntry(id, userId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Mood entry not found' });
    }

    res.status(200).json({ message: 'Mood entry deleted successfully' });
  } catch (error) {
    log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to delete mood entry' });
  }
};

module.exports = {
  getMoodEntries,
  getMoodEntriesToday,
  createMoodEntry,
  editMoodEntry,
  deleteMoodEntry,
};