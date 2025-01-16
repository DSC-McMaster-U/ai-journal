const session = require('express-session');
const passport = require('passport');
const auth = require('./services/authService');

function setupPassport(app) {
  app.use(
    session({
      secret: 'Test Secret ',
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  auth.initialize(passport);
}

module.exports = setupPassport;
