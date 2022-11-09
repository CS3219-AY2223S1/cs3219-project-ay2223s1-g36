'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roomId: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      questionId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      user1Id: {
        type: Sequelize.STRING
      },
      user2Id: {
        type: Sequelize.STRING
      },
      difficulty: {
        type: Sequelize.STRING
      },
      ongoing: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex('Matches', ['roomId', 'user1Id', 'user2Id']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Matches');
  }
};