const { log } = require('../logger');
const moodService = require('../services/moodService');

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

const getMoodEntriesByDate = async (req, res) => {
  try {
    const userId = req.token.user.id;
    const date = req.params.date;

    if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
    }

    const result = await moodService.getMoodEntriesByDate(userId, date);

    res.status(200).json({ data: result });
  } catch (error) {
    log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to retrieve mood entries' });
  }
};

const createMoodEntry = async (req, res) => {
  try {
    const userId = req.token.user.id;
    const dailyRecordId = req.dailyRecord.id;
    const { moods } = req.body;

    if (!userId || !moods || !dailyRecordId || moods.length === 0) {
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
    const userId = req.token.user.id;
    const moodInstanceId = req.params.id;
    const { moods } = req.body;

    if (!userId || !moodInstanceId || !moods) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await moodService.editMoodEntry(userId, moodInstanceId, moods);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Mood entry not found' });
    }

    res.status(200).json({
      data: {
        id: moodInstanceId,
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
    const id = req.params.id;
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
  getMoodEntriesToday,
  getMoodEntriesByDate,
  createMoodEntry,
  editMoodEntry,
  deleteMoodEntry,
};