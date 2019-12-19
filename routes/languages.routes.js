const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");

const Language = require("../sequelize/models/languages");

//GET ALL
router.get("/", async (req, res) => {
    try {
        const languages = await Language.findAll();
        res.status(200).json(languages);
    } catch (err) {
        res.status(400).json(err);
    }
});

//GET ONE
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const languages = await Language.findOne({
            where: {
                uuid: id
            }
        });

        res.status(200).json(languages);
    } catch (err) {
        res.status(400).json(err);
    }
});

//PUT ONE
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        Language.update(
            {
                name
            },
            {
                where: {
                    uuid: id
                }
            }
        );
        const languages = await Language.findOne({
            where: {
                uuid: id
            }
        });
        res.status(200).json(languages);
    } catch (err) {
        res.status(400).json(err);
    }
});

//POST ONE
router.post("/", (req, res) => {
    const { name } = req.body;
    Language.create({
        name
    })
        .then(languages => res.status(200).json(languages))
        .catch(err => res.status(400).json(err));
});

//DELETE ONE
// ATTENTION la route ne fonctionne pas!!
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const languages = await Language.findOne({
            where: {
                uuid: id
            }
        });
        await Language.destroy({
            where: {
                uuid: id
            }
        });
        res.status(200).json(languages);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
