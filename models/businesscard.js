'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class businessCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.businessCard.belongsTo(models.user, {foreignKey:"user_id"})
    }
  };
  businessCard.init({
    frontImg: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'businessCard',
  });
  return businessCard;
};