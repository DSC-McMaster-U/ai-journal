// connect to the database for this apis purpose - reading and writing to user_moods
const { connection } = require("../database");

const getMoodEntries = () => {
  return new Promise((resolve, reject) => {
    const query = `
            SELECT * FROM user_moods
        `;
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const createMoodEntry = (userId, moodId, dailyRecordId) => {
  return new Promise((resolve, reject) => {
    const query = `
            INSERT INTO user_moods (user_id, mood_id, daily_record_id)
            VALUES (?, ?, ?)
        `;
    connection.query(
      query,
      [userId, moodId, dailyRecordId],
      (error, results) => {
        if (error) {
          console.error("database error: ", error);
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const editMoodEntry = (id, moodId) => {
  return new Promise((resolve, reject) => {
    const query = `
            UPDATE user_moods
            SET mood_id = ?
            WHERE id = ?
        `;
    connection.query(query, [moodId, id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const deleteMoodEntry = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
            DELETE FROM user_moods WHERE id = ?
        `;
    connection.query(query, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// export functions for use
module.exports = {
  getMoodEntries,
  createMoodEntry,
  editMoodEntry,
  deleteMoodEntry,
};
