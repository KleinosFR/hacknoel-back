const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");

const Role = require("../sequelize/models/roles");

//GET ALL
router.get("/", async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (err) {
        res.status(400).json(err);
    }
});

//GET ONE
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const roles = await Role.findOne({
            where: {
                uuid: id
            }
        });

        res.status(200).json(roles);
    } catch (err) {
        res.status(400).json(err);
    }
});

//PUT ONE
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
        Role.update(
            {
                role
            },
            {
                where: {
                    uuid: id
                }
            }
        );
        const roles = await Role.findOne({
            where: {
                uuid: id
            }
        });
        res.status(200).json(roles);
    } catch (err) {
        res.status(400).json(err);
    }
});

//POST ONE
router.post("/", (req, res) => {
    const { role } = req.body;
    Role.create({
        role
    })
        .then(roles => res.status(200).json(roles))
        .catch(err => res.status(400).json(err));
});

//DELETE ONE
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const roles = await Role.findOne({
            where: {
                uuid: id
            }
        });
        await Role.destroy({
            where: {
                uuid: id
            }
        });
        res.status(200).json(roles);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
