const express = require("express");
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
 * /api/users/o-auth:
 *   get:
 *     summary: Attemps to authenticate the user using an o-auth token, returns the users data
 *     parameters:
 *       - in: header
 *         name: o-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token given by attempted o-auth login
 *     responses:
 *       200:
 *         description: Users data encoded as a UTF-8 json object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "John"
 *                     email:
 *                       type: string
 *                       example: "John@gmail.com"
 *                     id:
 *                       type: string
 *                       example: "0wfw09j290fji"
 *       500:
 *         description: Attempt to login user with o-auth failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Access Denied"
 */
router.post("/o-auth", (req, res) => {
    //Function outline
    // 1. Send o-auth key with a hash secret to google for verification
    // 2. Await call back request from o-auth-callback route
    // 3. Check the result of the call back and make sure the hash secret lines up (send error if they don't)
    // 4. Send request to the database getting the users information or creating the user if they don't exist
    // 5. Await response from database
    // 6. Return the users information (send error if an error with the database occurs)
});

//building o-auth requests based on googles documentation:
//https://developers.google.com/identity/protocols/oauth2/web-server#node.js
//https://www.descope.com/blog/post/oauth2-react-authentication-authorization

module.exports = router;
