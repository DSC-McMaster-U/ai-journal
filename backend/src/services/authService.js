const GoogleStrategy = require("passport-google-oidc");
const jwt = require("jsonwebtoken");
const connection = require("../database.js");
const { log, warn, error } = require("../logger.js");

const generateUsername = (profile) => {
    let username = profile.displayName ?? "";

    username.replace(" ", "-");

    return username + Date.now().toString().slice(-7);
};

const addUser = (user) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "INSERT INTO `ai-journal`.`users` (id, name, email, created_at) VALUES (?, ?, ?, ?)",
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
            log("Insertion request resulted in: " + res);
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
            "SELECT * FROM `ai-journal`.`users` WHERE email = ?",
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
            log("Selection request resulted in: " + results);

            if (results.length > 1) {
                throw "Multiple users with same ID!!";
            }

            if (results.length == 0) {
                return undefined;
            }

            return {
                username: "No usernames :(",
                email: results[0]["email"],
                name: results[0]["name"],
                id: results[0]["id"],
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
        log(Object.keys(profile));

        log(
            "In database check for " +
                profile.emails[0].value +
                " log in request"
        );

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
                clientID: process.env["GOOGLE_CLIENT_ID"],
                clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
                callbackURL: "/api/auth/callback",
                scope: ["profile", "email"],
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

/** Function used to protect routes via JWT sent with the request
 *  @output - Puts the resulting user information in the req.token field
 *  @error - Sends response with code 400 if a missing or improperly formatted token is sent
 *  @error - Sends reponse with code 401 if an invalid token is sent
 */
const authProtect = (req, res, next) => {
    const warnInvalidAuthenticationAttempt = () => {
        warn(
            "Invalid authentication attempt made from: " +
                req.ip +
                " @ " +
                req.hostname
        );
    };

    const token = req.header("Authorization");

    if (!token) {
        warnInvalidAuthenticationAttempt();
        res.status(400).send("Authorization token is missing").end();
        return;
    }

    if (token.startsWith("Bearer ") == false) {
        warnInvalidAuthenticationAttempt();
        res.status(400)
            .send("Authorization token should start with Bearer")
            .end();
        return;
    }

    const jwtToken = token.substring(7, token.length);

    try {
        log("Recieved Token: " + jwtToken + " from " + req.id);
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET || "");
        req.token = decoded;
    } catch (_) {
        warnInvalidAuthenticationAttempt();
        res.status(401).send("Invalid authorization token").end();
        return;
    }

    next();
};

module.exports = { initialize, authProtect };
