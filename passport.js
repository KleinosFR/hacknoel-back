require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;
const User = require("./sequelize/models/users");

const credentials = {
    github: {
        clientID: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: "http://http://localhost:8000/login/auth/github/callback"
    }
};

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

passport.use(
    new GitHubStrategy(
        credentials.github,
        async (accesToken, refreshToken, profile, cb) => {
            console.log(profile);

            let userData = {
                email: profile.emails[0].value
            };

            await User.findOrCreate({
                where: {
                    email: userData.email
                },
                defaults: {
                    isOAuth: false
                }
            });

            userData.jwt = jwt.sign({ email: userData.email }, secret, {
                expiresIn: "1h"
            });

            cb(null, userData);
        }
    )
);
