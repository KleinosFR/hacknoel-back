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
        callbackURL:
            "http://localhost:8000/login/auth/github/callback"
    }
};

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new GitHubStrategy(
        credentials.github,
        async (accesToken, refreshToken, profile, cb) => {

            let userData = {
                username: profile.username
            };

            await User.findOrCreate({
                where: {
                    username: userData.username
                },
                defaults: {
                    isOAuth: false
                }
            });

            userData.jwt = jwt.sign({ username: userData.username }, secret, {
                expiresIn: "1h"
            });

            cb(null, userData);
        }
    )
);
