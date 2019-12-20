const Sequelize = require("sequelize");
const sequelize = require("../index");

const Sign = sequelize.define(
    "Sign",
    {
        uuid: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        image: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    },
    {}
);

module.exports = Sign;
