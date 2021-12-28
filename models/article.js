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
      models.article.belongsTo(models.user, {foreignKey:"user_id"})
      models.article.hasMany(models.comment, {foreignKey:"article_id"})
      models.article.hasMany(models.image, {foreignKey:"article_id"})

    }
  };
  article.init({
    // userId:DataTypes.INTEGER,
    thumbnail: DataTypes.STRING,
    location: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'article',
  });
  return article;
};