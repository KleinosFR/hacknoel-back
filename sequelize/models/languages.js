const Sequelize = require("sequelize");
const sequelize = require("../index");

const Language = sequelize.define(
    "Language",
    {
        uuid: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {}
);

module.exports = Language;
