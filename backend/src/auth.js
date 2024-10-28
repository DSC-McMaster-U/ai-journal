const express = require("express");
const GoogleStrategy = require("passport-google-oidc");

function initialize(passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env["GOOGLE_CLIENT_ID"],
                clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
                callbackURL: "/api/users/google-o-auth-redirect",
                scope: ["profile"],
            },
            function dbCallback(issuer, profile, cb) {
                //TODO, verifies that the user is in the db
                console.log("We in the DB callback 🔥");
                cb(null, { id: profile.id });
            }
        )
    );

    passport.serializeUser(function (user, cb) {
        process.nextTick(function () {
            cb(null, { id: user.id, username: user.username, name: user.name });
        });
    });

    passport.deserializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
    });
}

module.exports = { initialize: initialize };
