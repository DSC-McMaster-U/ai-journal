const connection = require("../database");

// get all mood entries
const getAllMoods = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM `moods`",
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

// get mood entries by ID
const getMoodById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM `moods` WHERE id = ?",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

// Create a new mood entry
const createMood = (moodData) => {
  const { id, dailyRecordId, calm, excited, tired } = moodData;
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO `moods` (id, dailyRecordId, calm, excited, tired) VALUES (?, ?, ?, ?, ?)",
      [id, dailyRecordId, calm, excited, tired],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

// Update an existing mood entry
const updateMood = (id, updatedMoods) => {
  const { calm, excited, tired } = updatedMoods;
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE `moods` SET calm = ?, excited = ?, tired = ? WHERE id = ?",
      [calm, excited, tired, id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

// Delete a mood entry
const deleteMood = (id, dailyRecordId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM `moods` WHERE id = ? AND dailyRecordId = ?",
      [id, dailyRecordId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

module.exports = {
  getAllMoods,
  getMoodById,
  createMood,
  updateMood,
  deleteMood,
};