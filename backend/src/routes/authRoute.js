const express = require('express');
const passport = require('passport');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { authProtect } = require('../services/authService');

/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: Attemps to authenticate the user using google o-auth, should not be called via fetch calls, instead user should be redirected to this link
 *     responses:
 *       200:
 *         description: Redirects user to google authentication page
 */
router.get('/', passport.authenticate('google'));

//building o-auth requests based on googles documentation:
//https://developers.google.com/identity/protocols/oauth2/web-server#node.js
//https://www.descope.com/blog/post/oauth2-react-authentication-authorization

/**
 * @swagger
 * /api/auth/callback:
 *   get:
 *     summary: Redirect called from google-o-auth, should not be called directly
 *     responses:
 *       200:
 *         description: Redirects user to login page if login failed or dashboard if login succeeds
 *       500:
 *         description: Error with creating or handling the user has occurred
 */
router.get(
  '/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/login',
    failureMessage: true,
  }),
  function (req, res) {
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET || '', {
      expiresIn: '24h',
    });
    res.cookie('jwtToken', token);
    res.redirect('http://localhost:3000/login?method=o-auth-google');
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
 *                user:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      example: 1471034918
 *                    name:
 *                      type: string
 *                      example: "John Doe"
 *                    email:
 *                      type: string
 *                      example: johndoe@gmail.com
 *                    username:
 *                      type: string
 *                      example: John_Doe_1782
 *       400:
 *         description: Returns an error as there is no user in the current session
 */
router.options('/get-session-user', cors({ origin: true }));
router.get(
  '/get-session-user',
  cors({ origin: true }),
  authProtect,
  function (req, res) {
    if (req.token == undefined) {
      res.status(400).end();
    }

    res.setHeader('Content-Type', 'application/json');
    res
      .send(JSON.stringify({ user: req.token.user }))
      .status(200)
      .end();
  }
);

module.exports = router;
