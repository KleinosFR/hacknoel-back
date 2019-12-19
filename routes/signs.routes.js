const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");

const Sign = require("../sequelize/models/signs");

//GET ALL
router.get("/", async (req, res) => {
    try {
        const signs = await Sign.findAll();
        res.status(200).json(signs);
    } catch (err) {
        res.status(400).json(err);
    }
});

//GET ONE
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const signs = await Sign.findOne({
            where: {
                uuid: id
            }
        });

        res.status(200).json(signs);
    } catch (err) {
        res.status(400).json(err);
    }
});

//PUT ONE
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { image } = req.body;
    try {
        Sign.update(
            {
                image
            },
            {
                where: {
                    uuid: id
                }
            }
        );
        const signs = await Sign.findOne({
            where: {
                uuid: id
            }
        });
        res.status(200).json(signs);
    } catch (err) {
        res.status(400).json(err);
    }
});

//POST ONE
router.post("/", (req, res) => {
    const { image, UserUuid } = req.body;
    Sign.create({
        image,
        UserUuid
    })
        .then(signs => res.status(200).json(signs))
        .catch(err => res.status(400).json(err));
});

//DELETE ONE
// ATTENTION ne fonctionn pas
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const signs = await Sign.findOne({
            where: {
                uuid: id
            }
        });
        await Session.destroy({
            where: {
                uuid: id
            }
        });
        res.status(200).json(signs);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
