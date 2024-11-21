// routes/dailyRecordRoutes.js
const express = require("express");
const router = express.Router();
const dailyRecordController = require("../controllers/dailyRecordController");

/**
 * @swagger
 * /api/daily_records:
 *   get:
 *     summary: Get all daily records
 *     responses:
 *       200:
 *         description: A list of daily records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: int
 *                     example: 123123
 *                   userId:
 *                     type: string 
 *                     example: "a81bc81b-dead-4e5d-abff-90865d1e13b1"
 *                   date:
 *                     type: string
 *                     example: "2024-11-14"
 */
router.get("/", dailyRecordController.getAllDailyRecords);

/**
 * @swagger
 * /api/daily_records/{id}:
 *   get:
 *     summary: Get a daily record by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The daily record ID
 *     responses:
 *       200:
 *         description: A single daily record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: int
 *                   example: 123123
 *                 userId:
 *                   type: string
 *                   example: "a81bc81b-dead-4e5d-abff-90865d1e13b1"
 *                 date:
 *                   type: string
 *                   example: "2024-11-14"  
 *       404:
 *         description: Daily record not found
 */
router.get("/:id", dailyRecordController.getDailyRecordById);

/**
 * @swagger
 * /api/daily_records/{user_id}/{date}:
 *   get:
 *     summary: Get a daily record by user ID and date
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The date of the daily record (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: A daily record for the given user ID and date
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 123123
 *                 user_id:
 *                   type: string
 *                   example: "a81bc81b-dead-4e5d-abff-90865d1e13b1"
 *                 date:
 *                   type: string
 *                   example: "2024-11-14"
 *       404:
 *         description: Daily record not found
 */
router.get("/:user_id/:date", dailyRecordController.getDailyRecordByIdAndDate);

/**
 * @swagger
 * /api/daily_records:
 *   post:
 *     summary: Create a new daily record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The user ID
 *                 example: "a81bc81b-dead-4e5d-abff-90865d1e13b1"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date for the daily record (YYYY-MM-DD)
 *                 example: "2024-11-14"
 *     responses:
 *       201:
 *         description: Daily record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 123123
 *                 user_id:
 *                   type: string
 *                   example: "a81bc81b-dead-4e5d-abff-90865d1e13b1"
 *                 date:
 *                   type: string
 *                   example: "2024-11-14"
 *       400:
 *         description: Invalid data provided
 */
router.post("/", dailyRecordController.createDailyRecord);

module.exports = router;
