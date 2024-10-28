const express = require("express");
const passport = require("passport");
const router = express.Router();

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
        res.redirect("http://localhost:3000/dashboard");
    }
);

//building o-auth requests based on googles documentation:
//https://developers.google.com/identity/protocols/oauth2/web-server#node.js
//https://www.descope.com/blog/post/oauth2-react-authentication-authorization

module.exports = router;
