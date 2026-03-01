'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        schema: 'dbo',
        tableName: 'categories',
      },
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        status: {
          type: Sequelize.INTEGER,
          defaultValue: 1,
          allowNull: false,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categories');
  },
};
