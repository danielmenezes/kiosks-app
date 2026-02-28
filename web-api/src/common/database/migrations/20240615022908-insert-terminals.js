'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      {
        tableName: 'terminals',
        schema: 'dbo',
      },
      [
        {
          id: 1,
          name: 'admin',
          password: 'admin123',
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'customer',
          password: 'customer123',
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'processor',
          password: 'processor123',
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: 'panel',
          password: 'panel123',
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      {
        tableName: 'terminals',
        schema: 'dbo',
      },
      null,
      {},
    );
  },
};
