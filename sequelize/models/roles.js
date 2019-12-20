const Sequelize = require("sequelize");
const sequelize = require("../index");

const Role = sequelize.define(
    "Role",
    {
        uuid: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {}
);

module.exports = Role;
