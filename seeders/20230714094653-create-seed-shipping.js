'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Shippings', 
    Array.from({ length: 10 }).map((d, i) => ({
      name: 'OT Transport',
      quantity: i + 1,
      fee: (i + 1) <= 2 ? 180: 0,
      created_at: new Date(),
      updated_at: new Date()
    })))
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Shippings', null, {})
  }
};
