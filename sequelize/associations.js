const User = require("./models/users");
const Language = require("./models/languages");
const Session = require("./models/sessions");
const Role = require("./models/roles")
const Sign = require("./models/signs");

// USER
User.hasMany(Sign, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
User.belongsTo(Session, { foreignKey: { allowNull: true } });
User.belongsTo(Language, { foreignKey: { allowNull: true } });
User.belongsTo(Role, { foreignKey: { allowNull: true } });

// SIGN
Sign.belongsTo(User, { foreignKey: { allowNull: false } });

// SESSION
Session.hasMany(User, { foreignKey: { allowNull: false } });

// LANGUAGE
Language.hasMany(User, { foreignKey: { allowNull: false } });

// ROLE
Role.hasMany(User, { foreignKey: { allowNull: false } });
