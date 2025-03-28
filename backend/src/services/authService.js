const GoogleStrategy = require('passport-google-oidc');
const jwt = require('jsonwebtoken');
const { connection } = require('../database.js');
const { log, warn, error } = require('../logger.js');

const generateUsername = (profile) => {
  let username = profile.displayName ?? '';

  username.replace(' ', '-');

  return username + Date.now().toString().slice(-7);
};

const addUser = (user) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO `ai-journal`.`users` (id, name, email, created_at) VALUES (?, ?, ?, ?)',
      [user.id, user.name, user.email, new Date()],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  })
    .then((res) => {
      return true;
    })
    .catch((err) => {
      error(err);
      return false;
    });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM `ai-journal`.`users` WHERE email = ?',
      [email],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  })
    .then((results) => {
      if (results.length > 1) {
        throw 'Multiple users with same Email!!';
      }

      if (results.length == 0) {
        return undefined;
      }

      return {
        username: 'No usernames :(',
        email: results[0]['email'],
        name: results[0]['name'],
        id: results[0]['id'],
      };
    })
    .catch((err) => {
      error(err);
      return undefined;
    });
};

/** Function used to intialize the passport instance for use with google oauth
 *  @param { namespace } passport - Instance of passport to be initialized
 */
function initialize(passport) {
  const verifyInDatabase = async (issuer, profile, cb) => {
    // log(Object.keys(profile));

    // log('In database check for ' + profile.emails[0].value + ' log in request');

    let user = await getUserByEmail(profile.emails[0].value);

    if (user == undefined) {
      user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        username: generateUsername(profile),
      };

      addUser(user);
    }

    cb(null, user);
  };

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
        callbackURL: '/api/auth/callback',
        scope: ['profile', 'email'],
      },
      verifyInDatabase
    )
  );

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
      });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
}

//Assumes valid user or undefined is input
const usersAreEqual = (userA, userB) => {
  if (userA == undefined || userB == undefined) {
    return false;
  }

  //Compares every value at the keys in userA
  return Object.keys(userA).every((v, _) => userA[v] === userB[v]);
};

//Assumes valid user input
const userExistsInDatabase = async (user) => {
  const userInDB = await getUserByEmail(user.email);

  return usersAreEqual(user, userInDB);
};

const tokenMatchesSchema = (token) => {
  if (token.user == undefined) {
    // log('User not defined');
    return false;
  }

  let userKeys = Object.keys(token.user).sort();
  let expectedKeys = ['email', 'id', 'name', 'username'];

  if (userKeys.length != expectedKeys.length) {
    // log('Lengths not matching');
    return false;
  }

  if (!userKeys.every((v, i) => v === expectedKeys[i])) {
    // log('Keys not matching');
    return false;
  }

  return true;
};

const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');

    return decoded;
  } catch (_) {
    return undefined;
  }
};

const validateToken = async (token) => {
  if (token == undefined) {
    throw 'Invalid token';
  }

  const decoded = decodeToken(token);

  if (decoded == undefined) {
    throw 'Invalid token';
  }

  if (!tokenMatchesSchema(decoded)) {
    throw 'Invalid token schema';
  }

  if (!(await userExistsInDatabase(decoded.user))) {
    throw 'Token user is not valid';
  }

  return decoded;
};

/** Function used to protect routes via JWT sent with the request
 *  @output - Puts the resulting user information in the req.token field
 *  @error - Sends response with code 400 if a missing or improperly formatted token is sent
 *  @error - Sends reponse with code 401 if an invalid token is sent
 */
const authProtect = (req, res, next) => {
  const warnInvalidAuthenticationAttempt = (err) => {
    warn(
      'Invalid authentication attempt made from: ' +
        req.ip +
        ' @ ' +
        req.hostname +
        '. Error: ' +
        err
    );
  };

  console.log('AUTHBYPASS ' + process.env.AUTHBYPASS);

  //Bypass added to not require DB usage
  if (process.env.AUTHBYPASS) {
    log('============== AUTH PROTECT: BYPASS ==================');
    req.token = {
      user: {
        name: 'By passed',
        id: '1930411341',
        email: 'Bypassed@gmail.com',
      },
    };
    next();
    return;
  }

  const token = req.header('Authorization');

  if (!token) {
    warnInvalidAuthenticationAttempt('Authorization token is missing');
    res.status(400).send('Authorization token is missing').end();
    return;
  }

  if (!token.startsWith('Bearer ')) {
    warnInvalidAuthenticationAttempt(
      'Authorization token should start with Bearer'
    );
    res.status(400).send('Authorization token should start with Bearer').end();
    return;
  }

  const jwtToken = token.substring(7, token.length);

  validateToken(jwtToken)
    .then((result) => {
      req.token = result;
      log('============== AUTH PROTECT: SUCCESS ==================');
      next();
    })
    .catch((err) => {
      log('============== AUTH PROTECT: FAILURE ==================');
      warnInvalidAuthenticationAttempt(err);
      res.status(401).send({ error: 'Invalid authorization token' }).end();
      return;
    });
};

module.exports = { initialize, authProtect };
