const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Group = require('./group')(sequelize, Sequelize);

db.User.belongsToMany(db.Group, { through: 'temp' });
db.Group.belongsToMany(db.User, { through: 'temp' });

module.exports = db;
