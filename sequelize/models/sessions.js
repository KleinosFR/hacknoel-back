const Sequelize = require("sequelize");
const sequelize = require("../index");

const Session = sequelize.define(
  "Session",
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
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {}
);

module.exports = Session;