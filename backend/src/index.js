// index.js
require("dotenv").config();

const express = require("express");
const app = express();
const { log, warn, error } = require("./logger");

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
const { authProtect } = require("./services/authService");
const warehouseRoutes = require("./routes/warehouseRoute");

app.use("/api/warehouses", authProtect, warehouseRoutes);
app.use("/api/auth", authRoute);

// Default route
app.get("/api", (req, res) =>
    res.send("Try: /api/status, /api/warehouses, or /api/warehouses/:id")
);

// Status endpoint
app.get("/api/status", (req, res) => res.send("Success."));

// Set port based on environment
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    log(`Server is running on port ${PORT}`);
    log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
