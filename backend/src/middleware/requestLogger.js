const { fetching, log } = require('../logger');

const requestLogger = (req, res, next) => {
  const { method, originalUrl, body, headers } = req;
  const authHeader = headers.authorization ? 'User exists' : 'No Auth Header';

  log('============== REQUEST LOGGER ==================');
  fetching(`Incoming Request: ${method} ${originalUrl}`, {
    auth: authHeader,
    body: body && Object.keys(body).length ? body : 'No Body',
  });

  next();
};

module.exports = requestLogger;
