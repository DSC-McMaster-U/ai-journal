// routes/dailyRecordRoute.js
const express = require("express");
const router = express.Router();
const dailyRecordController = require("../controllers/dailyRecordController");

/**
 * @swagger
 * /api/daily-records:
 *   get:
 *     summary: Get all the user's daily records
 *     responses:
 *       200:
 *         description: A list of the user's daily records 
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
 *                   user_id:
 *                     type: string
 *                     example: "a81bc81b-dead-4e5d-abff-90865d1e13b1"
 *                   date:
 *                     type: string
 *                     example: "2024-11-14"
 *       404: 
 *          description: No daily records found 
 *       500: 
 *          description: Internal server error 
 */
router.get("/", dailyRecordController.getAllDailyRecords);

/**
 * @swagger
 * /api/daily-records/today:
 *   get:
 *     summary: Get a daily record for the current day and user 
 *     responses:
 *       200:
 *         description: A single daily record for the current day and user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: int
 *                   example: 123123
 *                 user_id:
 *                   type: string
 *                   example: "a81bc81b-dead-4e5d-abff-90865d1e13b1"
 *                 date:
 *                   type: string
 *                   example: "2024-11-14"
 *       404:
 *         description: Daily record not found
 *       500: 
 *         description: Internal server error 
 */
router.get("/today", dailyRecordController.getDailyRecord);

module.exports = router;
