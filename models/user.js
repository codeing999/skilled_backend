'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.note);
      User.hasMany(models.comment);
      User.hasMany(models.Like);
    }
  }
  User.init({
    userid: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    email: DataTypes.STRING,
    nickname: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName : 'User'
  });
  return User;
};