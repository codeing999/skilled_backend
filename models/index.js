'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.User = require('./user.js')(sequelize, Sequelize);
db.Note = require('./note.js')(sequelize, Sequelize);
db.Comment = require('./comment.js')(sequelize, Sequelize);
db.Like = require('./like.js')(sequelize, Sequelize);

db.Note.hasMany(db.Like);
db.Like.belongsTo(db.Note, {
  foreignKey: "fk_note_id"
});
db.User.hasMany(db.Like, { as: "L" });
db.Like.belongsTo(db.User, {
  foreignKey: "fk_user_id",
  as: "userid"
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;




module.exports = db;
