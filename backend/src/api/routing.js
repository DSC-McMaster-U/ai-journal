//Example on how routing might work for different paths
const express = require("express");
const router = express.Router();
const globalPath = "/api";

function index(req, res) {
    res.send("We are in the API now!");
}

function generateRoutes(app) {
    router.get("/", index);
    app.use(globalPath, router);
}

module.exports = { generateRoutes };
