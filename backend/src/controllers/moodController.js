const { log } = require('../logger');
const moodService = require('../services/moodService');

const getMoods = async (req, res) => {
  try {
    const result = await moodService.getMoods();
    res.status(200).json({ data: result });
  } catch (error) {
    log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to retrieve moods' });
  }
};

const getMoodEntriesToday = async (req, res) => {
  try {
    const userId = req.token.user.id;
    const result = await moodService.getMoodEntriesToday(userId);

    res.status(200).json({ data: formatResponseData(result) });
  } catch (error) {
    log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to retrieve mood entries' });
  }
};

const getMoodEntriesByDate = async (req, res) => {
  try {
    const userId = req.token.user.id;
    const date = req.params.date;

    if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return res
        .status(400)
        .json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
    }

    const result = await moodService.getMoodEntriesByDate(userId, date);

    res.status(200).json({ data: formatResponseData(result) });
  } catch (error) {
    log(`Controller Error: ${error.message}`);
    res.status(500).json({ error: 'Failed to retrieve mood entries' });
  }
};

// Helper function to format the response data
const formatResponseData = (result) => {
  const formattedData = result.reduce((acc, curr) => {
    const {
      mood_instance_id,
      user_id,
      daily_record_id,
      mood_instance_created_at,
      id,
      mood_id,
    } = curr;

    // Check if mood_instance_id already exists in the accumulator
    let groupedData = acc.find(
      (item) => item.mood_instance_id === mood_instance_id
    );
    if (!groupedData) {
      groupedData = {
        mood_instance_id,
        user_id,
        daily_record_id,
        created_at: mood_instance_created_at,
        user_moods: [],
      };
      acc.push(groupedData);
    }

    groupedData.user_moods.push({ id, mood_id });
    return acc;
  }, []);
  return formattedData;
};

const createMoodEntry = async (req, res) => {
  try {
    const userId = req.token.user.id;
    const dailyRecordId = req.dailyRecord.id;
    const { moods } = req.body;

    if (!userId || !moods || !dailyRecordId || moods.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await moodService.createMoodEntry(
      userId,
      moods,
      dailyRecordId
    );
    res.status(201).json({
      data: {
        mood_instance_id: result.mood_instance_id,
        user_id: result.user_id,
        created_at: result.created_at,
        user_moods: result.user_moods,
      },
    });
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

    const result = await moodService.editMoodEntry(
      userId,
      moodInstanceId,
      moods
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Mood entry not found' });
    }

    res.status(200).json({
      data: {
        mood_instance_id: result.mood_instance_id,
        user_id: result.user_id,
        updated_at: result.updated_at,
        user_moods: result.user_moods,
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
  getMoods,
  getMoodEntriesToday,
  getMoodEntriesByDate,
  createMoodEntry,
  editMoodEntry,
  deleteMoodEntry,
};
