const { executeQuery } = require('../utils/query');

const getMoodEntries = (userId) => {
  const query = 'SELECT * FROM `ai-journal`.`user_moods` WHERE user_id = ?';
  return executeQuery(query, [userId]);
};

const getMoodEntriesToday = (userId) => {
  const query = 'SELECT `ai-journal`.`user_moods`.*, ' +
                '`ai-journal`.`user_mood_instances`.daily_record_id, ' +
                '`ai-journal`.`user_mood_instances`.created_at AS mood_instance_created_at ' +
                'FROM `ai-journal`.`user_moods` ' +
                'JOIN `ai-journal`.`user_mood_instances` ' +
                'ON `ai-journal`.`user_moods`.mood_instance_id = `ai-journal`.`user_mood_instances`.id ' +
                'WHERE DATE(`ai-journal`.`user_mood_instances`.created_at) = CURDATE()';
  return executeQuery(query, [userId]);
}

const createMoodEntry = async (userId, moods, dailyRecordId) => {
  const instanceQuery = 'INSERT INTO `ai-journal`.`user_mood_instances` (daily_record_id, created_at, user_id) VALUES (?, NOW(), ?)';
  const result = await executeQuery(instanceQuery, [dailyRecordId, userId]);
  const moodInstanceId = result.insertId;

  const values = moods.map(moodId => [userId, moodId, moodInstanceId, new Date()]);
  const query = 'INSERT INTO `ai-journal`.`user_moods` (user_id, mood_id, mood_instance_id, created_at) VALUES ?';

  return executeQuery(query, [values]);
};

const editMoodEntry = (id, moodId, userId) => {
  const query = 'UPDATE `ai-journal`.`user_moods` SET mood_id = ? WHERE id = ? AND user_id = ?';
  return executeQuery(query, [moodId, id, userId]);
};

const deleteMoodEntry = (id, userId) => {
  const query = 'DELETE FROM `ai-journal`.`user_moods` WHERE id = ? AND user_id = ?';
  return executeQuery(query, [id, userId]);
};

module.exports = {
  getMoodEntries,
  getMoodEntriesToday,
  createMoodEntry,
  editMoodEntry,
  deleteMoodEntry,
};