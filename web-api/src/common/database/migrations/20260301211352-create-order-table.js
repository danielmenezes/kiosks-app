'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        schema: 'dbo',
        tableName: 'orders',
      },
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        orderNumber: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        terminalId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'terminals',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        status: {
          type: Sequelize.ENUM(
            'OPEN',
            'PENDING_PAYMENT',
            'PAID',
            'PREPARING',
            'FINISHED',
            'CANCELLED',
          ),
          defaultValue: 'OPEN',
        },
        totalAmount: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
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
    await queryInterface.dropTable('orders');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_orders_status";',
    );
  },
};
