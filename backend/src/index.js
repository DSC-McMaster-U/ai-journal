const express = require("express");
const app = express();
const PORT = 3000;

const sampleRoutes = require("./routes/sample");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");

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
