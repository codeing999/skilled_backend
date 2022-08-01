'use strict';
import Model from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  note.init({
    noteid: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    createdat: DataTypes.DATE,
    like: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'note',
  });
  return note;
};