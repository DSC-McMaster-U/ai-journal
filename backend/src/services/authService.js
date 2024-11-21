const GoogleStrategy = require("passport-google-oidc");
const jwt = require("jsonwebtoken");
const connection = require("../database.js");

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
                console.log("I'm crying for aiden");

                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        );
    })
        .then(() => true)
        .catch((err) => {
            console.log(err);
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
            console.log(results);

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
            console.log(err);
            undefined;
        });
};

function initialize(passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env["GOOGLE_CLIENT_ID"],
                clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
                callbackURL: "/api/auth/callback",
                scope: ["profile", "email"],
            },
            async function dbCallback(issuer, profile, cb) {
                //TODO, verifies that the user is in the db
                console.log("We in the DB callback 🔥");
                console.log("Profile keys: " + Object.keys(profile));

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
            }
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

const jwtAuth = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        throw new Error("Authorization token is missing");
    }
    if (token.startsWith("Bearer ") == false) {
        throw new Error("Authorization token should start with Bearer");
    }
    const jwtToken = token.substring(7, token.length);
    try {
        console.log("Recieved Token: " + jwtToken);
        console.log("Decoding...");
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET || "");
        req.token = decoded;
    } catch (err) {
        throw new Error("Invalid token");
    }

    next();
};

module.exports = { initialize, jwtAuth };
