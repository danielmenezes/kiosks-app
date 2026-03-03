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
        status: {
          type: Sequelize.ENUM(
            'open',
            'pending_payment',
            'paid',
            'preparing',
            'finished',
            'cancelled',
          ),
          allowNull: false,
          defaultValue: 'open',
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

  async down(queryInterface) {
    await queryInterface.dropTable({
      schema: 'dbo',
      tableName: 'orders',
    });

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_orders_status";',
    );
  },
};
