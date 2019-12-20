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
        callbackURL: "https://hacknoel-api.herokuapp.com/login/auth/github/callback"
    },
    google: {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "https://hacknoel-api.herokuapp.com/login/auth/google/callback"
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


passport.use(
    new GoogleStrategy(
        credentials.google,
        async (accesToken, refreshToken, profile, cb) => {
            let userData = {
                email: profile.emails[0].value,
            };

            await User.findOrCreate({
                where: {
                    email: userData.email
                },
                defaults: {
                    isOAuth: true
                }
            });

            userData.jwt = jwt.sign({ email: userData.email }, secret, {
                expiresIn: "1h"
            });

            cb(null, userData);
        }
    )
);