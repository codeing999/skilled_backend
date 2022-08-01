'use strict';
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
      // define association here
    }
  }
  comment.init({
    commentid: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    content: DataTypes.STRING,
    createdat: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};