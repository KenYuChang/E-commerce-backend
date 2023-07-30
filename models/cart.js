'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsToMany(models.Product, {
        through: { models: models.CartItem, unique: false },
        foreignKey: 'cart_id',
        as: 'items'
      })
    }
  };
  Cart.init({
    quantity: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'Carts',
    underscored: true,
  });
  return Cart;
};