'use strict';
const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        account: 'buyer',
        password: await bcrypt.hash('titaner', 10),
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date() 
      },
      {
        account: 'seller',
        password: await bcrypt.hash('titaner', 10),
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date() 
      }
  ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
