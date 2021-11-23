'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // define association here

      models.article.belongsTo(models.user, {foreignKey: 'user_id'})

    }
  };
  article.init({
    user: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    images: DataTypes.STRING,
    location: DataTypes.STRING,
    content: DataTypes.STRING,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'article',
  });
  return article;
};