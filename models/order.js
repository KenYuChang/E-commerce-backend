'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsToMany(models.Product, {
        as: 'items',
        through: {
          model: models.OrderItem,
          unique: false
        },
        foreignKey: 'OrderId'
      })
    }
  };
  Order.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    message: DataTypes.TEXT,
    amount: DataTypes.INTEGER,
    shipping_status: DataTypes.STRING,
    payment_status: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    underscored: true,
  });
  return Order;
};