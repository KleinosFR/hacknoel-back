const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");

const Session = require("../sequelize/models/sessions");

//GET ALL
router.get("/", async (req, res) => {
    try {
        const sessions = await Session.findAll();
        res.status(200).json(sessions);
    } catch (err) {
        res.status(400).json(err);
    }
});

//GET ONE
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const sessions = await Session.findOne({
            where: {
                uuid: id
            }
        });

        res.status(200).json(sessions);
    } catch (err) {
        res.status(400).json(err);
    }
});

//PUT ONE
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, address } = req.body;
    try {
        Session.update(
            {
                name,
                address
            },
            {
                where: {
                    uuid: id
                }
            }
        );
        const sessions = await Session.findOne({
            where: {
                uuid: id
            }
        });
        res.status(200).json(sessions);
    } catch (err) {
        res.status(400).json(err);
    }
});

//POST ONE
router.post("/", (req, res) => {
    const { name, address } = req.body;
    Session.create({
        name,
        address
    })
        .then(sessions => res.status(200).json(sessions))
        .catch(err => res.status(400).json(err));
});

//DELETE ONE
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const sessions = await Session.findOne({
            where: {
                uuid: id
            }
        });
        await Session.destroy({
            where: {
                uuid: id
            }
        });
        res.status(200).json(sessions);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
