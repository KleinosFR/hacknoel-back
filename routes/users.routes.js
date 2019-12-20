const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");

const User = require("../sequelize/models/users");

//GET ALL
router.get("/", async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
});

//GET ONE
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const users = await User.findOne({
            where: {
                uuid: id
            }
        });

        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
});

//PUT ONE
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const {
        firstName,
        lastName,
        username,
        password,
        RoleUuid,
        is_OAuth,
        SessionUuid,
        LanguageUuid
    } = req.body;
    try {
        User.update(
            {
                firstName,
                lastName,
                username,
                password,
                RoleUuid,
                SessionUuid,
                LanguageUuid,
                is_OAuth
            },
            {
                where: {
                    uuid: id
                }
            }
        );
        const users = await User.findOne({
            where: {
                uuid: id
            }
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
});

//POST ONE
router.post("/", (req, res) => {
    const {
        firstName,
        lastName,
        username,
        password,
        is_OAuth,
        SessionUuid,
        LanguageUuid,
        RoleUuid
    } = req.body;
    User.create({
        firstName,
        lastName,
        username,
        password,
        is_OAuth,
        SessionUuid,
        LanguageUuid,
        RoleUuid
    })
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json(err));
});

//DELETE ONE
// ATTENTION ne foncitonne pas !
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const users = await User.findOne({
            where: {
                uuid: id
            }
        });
        await Session.destroy({
            where: {
                uuid: id
            }
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
