'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.follow.belongsTo(models.user, {foreignKey:"from_user_id"});
      models.follow.belongsTo(models.user, {foreignKey:"to_user_id"});
    }
  };
  follow.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'follow',
  });
  return follow;
};