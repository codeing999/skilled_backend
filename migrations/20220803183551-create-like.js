'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('like', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
        }
    });
    await queryInterface.addColumn(
      'like',
      'fk_note_id', 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'note',
          key: "noteid"
        }
      }
    );
    await queryInterface.addColumn(
      'like',
      'fk_user_id', 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: "userId"
        }
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('like');
  }
};