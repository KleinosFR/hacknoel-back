require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const User = require("../sequelize/models/users");

router.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["profile", "username"] })
);

router.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/", session: false }),
    (req, res) => {
        const { jwt } = req.user;
        res.redirect(`http://localhost:3000/sign?token=${jwt}`);
    }
);


module.exports = router;
