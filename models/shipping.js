'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Shipping.init({
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    fee: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Shipping',
    tableName: 'Shippings',
    underscored: true,
  });
  return Shipping;
};