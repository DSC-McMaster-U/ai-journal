// connect to the database for this apis purpose - reading and writing to user_moods
const connection = require("../database");

// create a mood entry
const createMoodEntry = (userId, moodId, dailyRecordId) => {
    return new Promise((resolve, reject) => {
        // insert the user's mood record into the table
        const query = `
            INSERT INTO user_moods (user_id, mood_id, daily_record_id)
            VALUES (?, ?, ?)
        `;
        // execute query with query parameters
        connection.query(query, [userId, moodId, dailyRecordId], (error, results) => {
            if (error) {
                console.error("database error: ", error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// edit an existing mood entry
const editMoodEntry = (id, userId, moodId, dailyRecordId) => {
    return new Promise((resolve, reject) => {
        // query to update entry
        const query = `
            UPDATE user_moods
            SET user_id = ?, mood_id = ?, daily_record_id = ?
            WHERE id = ?
        `;
        // execute query with specific parameters
        connection.query(query, [userId, moodId, dailyRecordId, id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// delete a mood entry
const deleteMoodEntry = (id) => {
    return new Promise((resolve, reject) => {
        // deletion query
        const query = `
            DELETE FROM user_moods WHERE id = ?
        `;
        // execute
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
  createMoodEntry,
  editMoodEntry,
  deleteMoodEntry,
};
