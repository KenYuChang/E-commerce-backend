'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', 
    [
      {
        name: '奶油蛋糕',
        description: '香甜奶油，讓人愛不釋手',
        price: 850,
        origin_price: 350,
        quantity: 20,
        image: 'https://unsplash.com/photos/kPxsqUGneXQ',
        category_id: 4,
        is_enabled: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: '奶油蛋糕',
        description: '香甜奶油，讓人愛不釋手',
        price: 850,
        origin_price: 350,
        quantity: 20,
        image: 'https://unsplash.com/photos/kPxsqUGneXQ',
        category_id: 4,
        is_enabled: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: '奶油蛋糕',
        description: '香甜奶油，讓人愛不釋手',
        price: 850,
        origin_price: 350,
        quantity: 20,
        image: 'https://unsplash.com/photos/kPxsqUGneXQ',
        category_id: 4,
        is_enabled: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: '奶油蛋糕',
        description: '香甜奶油，讓人愛不釋手',
        price: 850,
        origin_price: 350,
        quantity: 20,
        image: 'https://unsplash.com/photos/kPxsqUGneXQ',
        category_id: 4,
        is_enabled: true,
        created_at: new Date(),
        updated_at: new Date(),
      }
  ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {})
  }
};
