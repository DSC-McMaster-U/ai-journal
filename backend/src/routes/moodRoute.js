// import express.js framework and moodController
const express = require("express");
const router = express.Router();
const moodController = require("../controllers/moodController");

/**
 * @swagger
 * /api/moods:
 *   post:
 *     summary: Create a new mood entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               moodId:
 *                 type: integer
 *                 example: 1
 *               dailyRecordId:
 *                 type: integer
 *                 example: 101
 *     responses:
 *       201:
 *         description: Mood entry created successfully
 */
router.post("/", moodController.createMoodEntry);

/**
 * @swagger
 * /api/moods/{id}:
 *   put:
 *     summary: Edit an existing mood entry
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The mood entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               moodId:
 *                 type: integer
 *                 example: 1
 *               dailyRecordId:
 *                 type: integer
 *                 example: 101
 *     responses:
 *       200:
 *         description: Mood entry updated successfully
 *       404:
 *         description: Mood entry not found
 */
router.put("/:id", moodController.editMoodEntry);

/**
 * @swagger
 * /api/moods/{id}:
 *   delete:
 *     summary: Delete a mood entry
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The mood entry ID
 *     responses:
 *       200:
 *         description: Mood entry deleted successfully
 *       404:
 *         description: Mood entry not found
 */
router.delete("/:id", moodController.deleteMoodEntry);

module.exports = router;