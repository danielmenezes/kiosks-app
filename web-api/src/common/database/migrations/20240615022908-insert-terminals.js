'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 10;

    const adminPassword = await bcrypt.hash('admin123', saltRounds);
    const customerPassword = await bcrypt.hash('customer123', saltRounds);
    const processorPassword = await bcrypt.hash('processor123', saltRounds);
    const panelPassword = await bcrypt.hash('panel123', saltRounds);

    await queryInterface.bulkInsert(
      {
        tableName: 'terminals',
        schema: 'dbo',
      },
      [
        {
          id: 1,
          name: 'admin',
          password: adminPassword,
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'customer',
          password: customerPassword,
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'processor',
          password: processorPassword,
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: 'panel',
          password: panelPassword,
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    );
  },

  down: async (queryInterface) => {
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
