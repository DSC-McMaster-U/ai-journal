const express = require("express");
const router = express.Router();
const moodsController = require("../controllers/moodsController");


// Route to get all mood entries
router.get("/", moodsController.getAllMoods);

// Route to get mood entries by user ID
router.get("/users/:usersId", moodsController.getMoodByUserId);

// Route to get mood entries by daily record ID
router.get("/daily_records/:dailyRecordId", moodsController.getMoodByDailyId);

// Route to get mood entry by ID
router.get("/:id", moodsController.getMoodById);

// Route to create a new mood entry
router.post("/", moodsController.createMood);

// Route to update an existing mood entry
router.put("/:id", moodsController.updateMood);

// Route to delete a mood entry
router.delete("/:id", moodsController.deleteMood);

module.exports = router;