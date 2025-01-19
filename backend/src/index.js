// index.js
require('dotenv').config();

const express = require('express');
const app = express();
const { log, warn, error } = require('./logger');

// Body parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// CORS
const cors = require('cors');
app.use(cors());

//Passport Auth Setup
const setupPassport = require('./passport');
setupPassport(app);

// Swagger docs setup
const setupSwagger = require('./swagger');
setupSwagger(app);

// Middleware
const dailyRecordMiddleware = require('./middleware/dailyRecordMiddleware');
const { authProtect } = require('./services/authService');

// Route setup
const authRoute = require('./routes/authRoute');
const dailyRecordRoutes = require('./routes/dailyRecordRoute');
const warehouseRoutes = require('./routes/warehouseRoute');
const moodRoutes = require('./routes/moodRoute');
const tabRoutes = require('./routes/tabsRoute');
const journalRoutes = require('./routes/journalRoute');

// Route middleware
app.use('/api/journals', authProtect, dailyRecordMiddleware, journalRoutes);
app.use('/api/warehouses', authProtect, dailyRecordMiddleware, warehouseRoutes);
app.use('/api/daily-records', dailyRecordMiddleware, dailyRecordRoutes);
app.use('/api/auth', authRoute);
app.use('/api/moods', dailyRecordMiddleware, moodRoutes);
app.use('/api/tabs', dailyRecordMiddleware, tabRoutes);

// Default route
app.get('/api', (req, res) =>
  res.send('Try: /api/status, /api/warehouses, or /api/warehouses/:id')
);

// Status endpoint
app.get('/api/status', (req, res) => res.send('Success.'));

// Test sum endpoint
app.get('/api/sum', (req, res) => {
  log('GET /api/sum');
  log('GET /api/sum');
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

  process.on('SIGINT', () => {
    server.close(() => {
      console.log('Server closed due to app termination');
      process.exit(0);
    });
  });
}
