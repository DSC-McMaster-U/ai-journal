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
const moodRoutes = require("./routes/moodRoute");
const tabRoutes = require("./routes/tabsRoute");

app.use("/api/warehouses", warehouseRoutes);
app.use("/api/auth", authRoute);
app.use("/api/moods", moodRoutes);
app.use("/api/tabs", tabRoutes);

// TODO remove this and setup tests for the other endpoints
app.get("/api/sum", (req, res) => {
  const { a, b } = req.query;

  // Validate query parameters
  if (!a || !b) {
    return res
      .status(400)
      .send({ error: "Missing query parameters 'a' and/or 'b'" });
  }

  const numA = parseFloat(a);
  const numB = parseFloat(b);

  // Check if both query parameters are valid numbers
  if (isNaN(numA) || isNaN(numB)) {
    return res.status(400).send({ error: "'a' and 'b' must be valid numbers" });
  }

  const sum = numA + numB;
  res.status(200).send({ sum });
});

// Start the server
module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 8080;
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("Server closed due to app termination");
      process.exit(0);
    });
  });
}
