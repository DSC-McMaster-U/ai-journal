const express = require("express");
const passport = require("passport");
const router = express.Router();
const cors = require("cors");

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Alice
 */
router.get("/", (req, res) => {
    res.json([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
    ]);
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     responses:
 *       200:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created!
 */
router.post("/", (req, res) => {
    res.json({ message: "User created!" });
});

/**
 * @swagger
 * /api/users/google-o-auth:
 *   get:
 *     summary: Attemps to authenticate the user using google o-auth, returns the users data
 *     responses:
 *       200:
 *         description: Redirects user to google authentication page
 */
router.get("/google-o-auth", passport.authenticate("google"));

//building o-auth requests based on googles documentation:
//https://developers.google.com/identity/protocols/oauth2/web-server#node.js
//https://www.descope.com/blog/post/oauth2-react-authentication-authorization

/*
const generateAuthToken = function (req, res, next) {
    //Create a unique token
    const expirationTime = 120; //Token set to expire after 120s
    const token = new Token(32, req["user"]["id"], expirationTime);

    console.log(req.session);
    console.log(req.session.authtokens);

    //Store token in session storage
    req.session[token.value] = token;

    //Add token to request
    req["authtoken"] = token.value;

    console.log(token);

    next(null, req);
};*/

/**
 * @swagger
 * /api/users/google-o-auth:
 *   get:
 *     summary: Redirect called from google-o-auth, should not be called directly
 *     responses:
 *       200:
 *         description: Redirects user to login page if login failed or dashboard if login succeeds
 *       500:
 *         description: Error with creating or handling the user has occurred
 */
router.get(
    "/google-o-auth-redirect",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:3000/login",
        failureMessage: true,
    }),
    function (req, res) {
        res.redirect("http://localhost:3000/login?method=o-auth-google");
    }
);

/**
 * @swagger
 * /api/users/get-session-user:
 *   get:
 *     summary: Called for getting this user from a given session
 *     responses:
 *       200:
 *         description: Returns the user data from the current session
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  example: 1471034918
 *                username:
 *                  type: string
 *                  example: John_Doe_1782
 *                name:
 *                  type: string
 *                  example: John Doe
 *       400:
 *         description: Returns an error as there is no user in the current session
 */
router.get("/get-session-user", cors(), function (req, res) {
    console.log(req.session);

    if (req.session == undefined || req.session.passport == undefined) {
        res.status(400).end();
        return;
    }

    req.send(req.session.passport.user);
});

module.exports = router;
