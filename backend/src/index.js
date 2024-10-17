const express = require("express");
const api = require("./api/routing");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World");
});

api.generateRoutes(app);

app.listen(port, () => {
    console.log("Server is running on port 3000");
});
