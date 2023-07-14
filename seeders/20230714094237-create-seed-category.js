'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        name: '千層蛋糕',
        created_at: new Date(),
        updated_at: new Date() 
      },
      {
        name: '奶油蛋糕',
        created_at: new Date(),
        updated_at: new Date() 
      },
      {
        name: '巧克力蛋糕',
        created_at: new Date(),
        updated_at: new Date() 
      },
      {
        name: '起司蛋糕',
        created_at: new Date(),
        updated_at: new Date() 
      }
  ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
