const express = require("express");
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
const setupSwagger = require("./swagger");
setupSwagger(app);

// Route setup
app.use("/api/sample", sampleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
