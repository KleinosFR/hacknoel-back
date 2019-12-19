const Sequelize = require("sequelize");
const sequelize = require("../index");

const User = sequelize.define(
  "User",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false
    }, 
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    is_OAuth: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },
  {}
);

module.exports = User;
