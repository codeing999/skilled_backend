'use strict';
const User = require('./user.js');

const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // note.belongsTo(models.User);
      // note.hasMany(models.comment);
      // note.hasMany(models.Like);
    }
  }
  note.init({
    noteid: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    fk_user_id: {
      type: DataTypes.INTEGER,      
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    createdat: DataTypes.DATE,
    like: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'note',
    tableName : 'note',
    //timestamps : false
  });
  return note;
};