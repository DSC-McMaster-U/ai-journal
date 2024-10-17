const { specs, swaggerUi } = require("./swagger");

const express = require("express");
const api = require("./api/routing");
const app = express();
const port = 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
  res.send("Hello World");
});

api.generateRoutes(app);

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
