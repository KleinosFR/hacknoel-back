const User = require("./models/users");
const Language = require("./models/language");
const Session = require("./models/sessions");
const Sign = require("./models/signs");



// USER
User.hasMany(Sign, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
User.belongsTo(Promo, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
User.belongsTo(Language, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });

// SIGN
Sign.belongsTo(User, { foreignKey: { allowNull: false }});

// PROMO
Promo.hasMany(User, { foreignKey: { allowNull: false } });

// LANGUAGE
Language.hasMany(User, { foreignKey: { allowNull: false } });