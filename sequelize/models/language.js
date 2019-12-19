const Sequelize = require("sequelize");
const sequelize = require("../index");

const Language = sequelize.define(
  "Language",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {}
);

module.exports = Language;