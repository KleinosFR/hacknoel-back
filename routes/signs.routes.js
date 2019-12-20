const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");

const Sign = require("../sequelize/models/signs");

const { auth } = require("../middlewares/auth");

//GET ALL
router.get(
    "/",
    /*auth, */ async (req, res) => {
        try {
            const signs = await Sign.findAll();
            res.status(200).json(signs);
        } catch (err) {
            res.status(400).json(err);
        }
    }
);

//GET ONE
router.get(
    "/:id",
    /*auth, */ async (req, res) => {
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
    }
);

//PUT ONE
router.put(
    "/:id",
    /*auth, */ async (req, res) => {
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
    }
);

//POST ONE
router.post(
    "/",
    /*auth, */ (req, res) => {
        const { image, UserUuid } = req.body;
        Sign.create({
            image,
            UserUuid
        })
            .then(signs => res.status(200).json(signs))
            .catch(err => res.status(400).json(err));
    }
);

//DELETE ONE
// ATTENTION ne fonctionn pas
router.delete(
    "/:id",
    /*auth, */ async (req, res) => {
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
    }
);

module.exports = router;
