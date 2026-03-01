'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        schema: 'dbo',
        tableName: 'products',
      },
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        categoryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'categories',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        description: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        status: {
          type: Sequelize.INTEGER,
          defaultValue: 1,
          allowNull: false,
        },
        imageUrl: {
          type: Sequelize.STRING(255),
          allowNull: true,
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
    await queryInterface.dropTable({
      schema: 'dbo',
      tableName: 'products',
    });
  },
};
