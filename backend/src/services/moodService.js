const { executeQuery } = require('../utils/query');

const getMoodEntries = (userId) => {
  const query = 'SELECT * FROM `ai-journal`.`user_moods` WHERE user_id = ?';
  return executeQuery(query, [userId]);
};

const getMoodEntryById = (id, userId) => {
  const query =
    'SELECT * FROM `ai-journal`.`user_moods` WHERE id = ? AND user_id = ?';
  return executeQuery(query, [id, userId]);
}

const createMoodEntry = (userId, name, dailyRecordId) => {
  const query = 
    'INSERT INTO `ai-journal`.`user_moods` (user_id, mood_id, daily_record_id) VALUES (?, ?, ?)';
  return executeQuery(query, [userId, name, dailyRecordId]);
};

const editMoodEntry = (id, moodId) => {
  const query = 'UPDATE `ai-journal`.`user_moods` SET mood_id = ? WHERE id = ?';
  return executeQuery(query, [moodId, id]);
};

const deleteMoodEntry = (id) => {
  const query = 'DELETE FROM `ai-journal`.`user_moods` WHERE id = ?';
  return executeQuery(query, [id]);
};

module.exports = {
  getMoodEntries,
  createMoodEntry,
  editMoodEntry,
  deleteMoodEntry,
};
