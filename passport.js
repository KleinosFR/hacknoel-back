const passport = require("passsport");
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
            "https://hacknoel-api.herokuapp.com/login/auth/github/callback"
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
            console.log(profile);

            let userData = {
                firstname: profile,

                email: profile.emails[0].value,
                name: profile.username,
                token: accesToken
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