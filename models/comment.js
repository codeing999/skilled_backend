'use strict';
const note = require('./note.js');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comment.belongsTo(models.User);
      comment.belongsTo(models.note);
    }
  }
  comment.init({
    commentid: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    fk_note_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'note',
        key: "noteid"
      }
    },
    fk_user_id: {
      type: DataTypes.INTEGER,
      references: {
        model:'User',
        key: "userid"
      }
    },
    content: DataTypes.STRING,
    createdat: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'comment',
    tableName : 'comment',
    //timestamps : false
  });
  return comment;
};