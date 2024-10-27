const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /api/sample:
 *   get:
 *     summary: Returns a sample message
 *     responses:
 *       200:
 *         description: A sample message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Welcome to the Sample API!
 */
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the Sample API!" });
});

module.exports = router;
