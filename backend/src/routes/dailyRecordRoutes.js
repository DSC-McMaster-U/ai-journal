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

module.exports = router;
