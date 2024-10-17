// routes/sample.js
/**
 * @swagger
 * /sample:
 *   get:
 *     summary: Returns a sample message
 *     responses:
 *       200:
 *         description: A successful response
 */
const express = require("express");
const router = express.Router();

router.get("/sample", (req, res) => {
  res.json({ message: "Sample message" });
});

module.exports = router;
