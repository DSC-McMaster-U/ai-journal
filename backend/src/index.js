// index.js
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const setupSwagger = require("./swagger");
const warehouseRoutes = require("./routes/warehouseRoutes");
const dailyRecordRoutes = require("./routes/dailyRecordRoutes");
const dailyRecordMiddleware = require("./middleware/dailyRecordMiddleware");  // Path to your middleware

const app = express();
app.use(bodyParser.json());

// Swagger docs setup
setupSwagger(app);

// Route setup
app.use("/api/warehouses", dailyRecordMiddleware, warehouseRoutes);
app.use("/api/daily_records", dailyRecordMiddleware, dailyRecordRoutes);

// Default route
app.get("/api", (req, res) =>
  res.send("Try: /api/status, /api/warehouses, /api/warehouses/:id, /api/daily_records, or /api/daily_records/:id")
);

// Status endpoint
app.get("/api/status", (req, res) => res.send("Success."));

// Set port based on environment
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
