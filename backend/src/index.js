// index.js
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const setupSwagger = require("./swagger");
const warehouseRoutes = require("./routes/warehouseRoutes");

const app = express();
const session = require("express-session");
const passport = require("passport");
//const path = require("path");
const auth = require("./auth.js");
//Will be needed once we add the DB
const SQLiteStore = require("connect-sqlite3")(session);

const PORT = process.env["PORT"];

const sampleRoutes = require("./routes/sample");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");

//Passport Auth Setup
app.use(
  session({
    secret: "Test Secret ",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.static(path.join(__dirname, "public")));
auth.initialize(passport);

// Swagger docs setup
setupSwagger(app);

// Route setup
app.use("/api/warehouses", warehouseRoutes);

// Default route
app.get("/api", (req, res) =>
  res.send("Try: /api/status, /api/warehouses, or /api/warehouses/:id")
);

// Status endpoint
app.get("/api/status", (req, res) => res.send("Success."));

// Set port based on environment
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
