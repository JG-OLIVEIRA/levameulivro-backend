'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('swaps',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        book_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        accepted: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        completed: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('swaps');
  }
};
