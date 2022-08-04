'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
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

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
