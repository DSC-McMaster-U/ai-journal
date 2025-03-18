const { executeQuery } = require('../utils/query');

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

const getMoodEntriesByDate = (userId, date) => {
  const query = 'SELECT `ai-journal`.`user_moods`.*, ' +
                '`ai-journal`.`user_mood_instances`.daily_record_id, ' +
                '`ai-journal`.`user_mood_instances`.created_at AS mood_instance_created_at ' +
                'FROM `ai-journal`.`user_moods` ' +
                'JOIN `ai-journal`.`user_mood_instances` ' +
                'ON `ai-journal`.`user_moods`.mood_instance_id = `ai-journal`.`user_mood_instances`.id ' +
                'WHERE `ai-journal`.`user_mood_instances`.user_id = ? AND DATE(`ai-journal`.`user_mood_instances`.created_at) = ?';
  return executeQuery(query, [userId, date]);
}

const createMoodEntry = async (userId, moods, dailyRecordId) => {
  const instanceQuery = 'INSERT INTO `ai-journal`.`user_mood_instances` (daily_record_id, created_at, user_id) VALUES (?, NOW(), ?)';
  const result = await executeQuery(instanceQuery, [dailyRecordId, userId]);
  const moodInstanceId = result.insertId;

  const values = moods.map(moodId => [userId, moodId, moodInstanceId, new Date()]);
  const query = 'INSERT INTO `ai-journal`.`user_moods` (user_id, mood_id, mood_instance_id, created_at) VALUES ?';

  return executeQuery(query, [values]);
};

const editMoodEntry = async (userId, moodInstanceId, moods) => {
  // Get existing moods for the mood instance
  const existingMoodsQuery = 'SELECT mood_id FROM `ai-journal`.`user_moods` WHERE mood_instance_id = ? AND user_id = ?';
  return executeQuery(existingMoodsQuery, [moodInstanceId, userId])
    .then(existingMoodsRows => {
      const existingMoods = existingMoodsRows.map(row => row.mood_id);

      // Determine which moods to remove or add
      const moodsToRemove = existingMoods.filter(moodId => !moods.includes(moodId));
      const moodsToAdd = moods.filter(moodId => !existingMoods.includes(moodId));

      const queries = [{ query: 'START TRANSACTION' }];

      // Deleted moods
      if (moodsToRemove.length > 0) {
        queries.push({
          query: 'DELETE FROM `ai-journal`.`user_moods` WHERE mood_instance_id = ? AND user_id = ? AND mood_id IN (?)',
          values: [moodInstanceId, userId, moodsToRemove]
        });
      }

      // Add moods
      if (moodsToAdd.length > 0) {
        const values = moodsToAdd.map(moodId => [userId, moodId, moodInstanceId, new Date()]);
        queries.push({
          query: 'INSERT INTO `ai-journal`.`user_moods` (user_id, mood_id, mood_instance_id, created_at) VALUES ?',
          values: [values]
        });
      }

      queries.push({ query: 'COMMIT' });

      return Promise.all(queries.map(query => executeQuery(query.query, query.values || [])));
    })
    .then(() => ({ mood_instance_id: moodInstanceId, user_id: userId }))
    .catch(error => {
      // Rollback if any error occurs
      return executeQuery('ROLLBACK').then(() => {
        console.error(`Failed to update mood entry: ${error.message}`);
        throw new Error(`Failed to update mood entry: ${error.message}`);
      });
    });
};

const deleteMoodEntry = (id, userId) => {
  const query = 'DELETE FROM `ai-journal`.`user_moods` WHERE id = ? AND user_id = ?';
  return executeQuery(query, [id, userId]);
};

module.exports = {
  getMoodEntriesToday,
  getMoodEntriesByDate,
  createMoodEntry,
  editMoodEntry,
  deleteMoodEntry,
};