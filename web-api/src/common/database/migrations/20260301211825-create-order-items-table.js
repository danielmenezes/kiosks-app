'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        schema: 'dbo',
        tableName: 'order_items',
      },
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        orderId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'orders',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        productId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'products',
            key: 'id',
          },
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        unitPrice: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        totalPrice: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        notes: {
          type: Sequelize.TEXT,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_items');
  },
};
