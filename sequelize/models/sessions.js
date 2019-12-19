const Sequelize = require("sequelize");
const sequelize = require("../index");

const Session = sequelize.define(
    "Session",
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
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {}
);

module.exports = Session;
