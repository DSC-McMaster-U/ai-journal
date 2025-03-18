// import express.js framework and moodController
const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController');

/**
 * @swagger
 * /api/moods/today:
 *   get:
 *     summary: Retrieve all mood entries
 *     description: Fetches a list of all mood instance entries for the current day in the database.
 *     responses:
 *       200:
 *         description: A list of mood instance entries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   userId:
 *                     type: string
 *                     example: "123e4567-e89b-12d3-a456-426614174000"
 *                   moodId:
 *                     type: integer
 *                     example: 1
 *                   moodInstanceId:
 *                     type: integer
 *                     example: 1
 *                   dailyRecordId:
 *                     type: integer
 *                     example: 101
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-11-24T12:00:00Z"
 *                   moodInstanceCreatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-11-24T12:00:00Z"
 */
router.get('/today', moodController.getMoodEntriesToday);

/**
 * @swagger
 * /api/moods/{date}:
 *   get:
 *     summary: Retrieve all mood entries
 *     description: Fetches a list of all mood instance entries for the specific day in the database.
 *     responses:
 *       200:
 *         description: A list of mood instance entries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   userId:
 *                     type: string
 *                     example: "123e4567-e89b-12d3-a456-426614174000"
 *                   moodId:
 *                     type: integer
 *                     example: 1
 *                   moodInstanceId:
 *                     type: integer
 *                     example: 1
 *                   dailyRecordId:
 *                     type: integer
 *                     example: 101
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-11-24T12:00:00Z"
 *                   moodInstanceCreatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-11-24T12:00:00Z"
 */
router.get('/:date', moodController.getMoodEntriesByDate);

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
 *               moods:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *               dailyRecordId:
 *                 type: integer
 *                 example: 101
 *     responses:
 *       201:
 *         description: Mood entry created successfully
 */
router.post('/', moodController.createMoodEntry);

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
 *               moods:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *               dailyRecordId:
 *                 type: integer
 *                 example: 101
 *     responses:
 *       200:
 *         description: Mood entry updated successfully
 *       404:
 *         description: Mood entry not found
 */
router.put('/:id', moodController.editMoodEntry);

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
router.delete('/:id', moodController.deleteMoodEntry);

module.exports = router;