'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Like.belongsTo(models.User);
      // Like.belongsTo(models.note);
    }
  }
  Like.init({
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    fk_note_id: {
      type: DataTypes.INTEGER,
    },
    fk_user_id: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Like',
    tableName : 'like',
    timestamps : false
  });
  return Like;
};