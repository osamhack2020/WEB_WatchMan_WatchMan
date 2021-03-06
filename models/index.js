const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const bcrypt = require('bcrypt');
const db = {};
require('dotenv').config();

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Group = require('./group')(sequelize, Sequelize);
db.Permit = require('./permit')(sequelize, Sequelize);
bcrypt.hash(process.env.ADMIN, 12).then((b)=> {
  const pw = b;
  db.User.findOrCreate({
    where: {userid: "admin"},
    defaults: {
      userid: "admin",
      name: "관리자",
      password: pw,
      gender: "남성(male)",
      permission: true,
    }
  });
});
db.User.belongsToMany(db.Group, { through: 'temp' });
db.Group.belongsToMany(db.User, { through: 'temp' });
db.Group.hasMany(db.Permit);
db.Permit.belongsTo(db.Group);

module.exports = db;
