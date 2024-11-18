// index.js
require("dotenv").config();

const express = require("express");
const app = express();

// Body parser middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//Passport Auth Setup
const setupPassport = require("./passport");
setupPassport(app);

// Swagger docs setup
const setupSwagger = require("./swagger");
setupSwagger(app);

// Route setup
const authRoute = require("./routes/authRoute");
const warehouseRoutes = require("./routes/warehouseRoute");
const moodsRoutes = require("./routes/moodsRoute");

app.use("/api/warehouses", warehouseRoutes);
app.use("/api/auth", authRoute);
app.use("/api/moods", moodsRoutes);

// Default route
app.get("/api", (req, res) =>
  res.send("Try: /api/status, /api/warehouses, /api/warehouses/:id, /api/moods, /api/moods/:id, /api/moods/:usersId, /api/moods/:dailyRecordId")
);

// Status endpoint
app.get("/api/status", (req, res) => res.send("Success."));

// Set port based on environment
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
