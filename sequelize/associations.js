const User = require("./models/users");
const Language = require("./models/languages");
const Session = require("./models/sessions");
const Sign = require("./models/signs");

// USER
User.hasMany(Sign, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
User.belongsTo(Session, { foreignKey: { allowNull: false } });
User.belongsTo(Language, { foreignKey: { allowNull: false } });

// SIGN
Sign.belongsTo(User, { foreignKey: { allowNull: false } });

// SESSION
Session.hasMany(User, { foreignKey: { allowNull: false } });

// LANGUAGE
Language.hasMany(User, { foreignKey: { allowNull: false } });
