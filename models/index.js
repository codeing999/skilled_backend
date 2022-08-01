'use strict';

import user from './user.js';
import note from './note.js';
import comment from './comment.js';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

user.hasMany(note, {
  foreignKey: 'userid',
  allowNull: false,
  constraints: true,
  onDelete: 'cascade'
});
note.belongsTo(user, {
  foreignKey: 'userid'
});
note.hasMany(comment, {
  foreignKey: 'noteid',
  allowNull: false,
  constraints: true,
  onDelete: 'cascade'
});
comment.belongsTo(comment, {
  foreignKey: 'noteid'
});

Chat.sync({
  force: process.env.TABLE_CREATE_ALWAYS === 'true', // true : (drop) table 데이터 없어질 수 있음
  alter: process.env.TABLE_ALTER_SYNC === 'true'     // 개발 끝나면 false로 하기
})
Participant.sync({
  force: process.env.TABLE_CREATE_ALWAYS === 'true', // true : (drop) table 데이터 없어질 수 있음
  alter: process.env.TABLE_ALTER_SYNC === 'true'     // 개발 끝나면 false로 하기
})


module.exports = db, user, note, comment;
