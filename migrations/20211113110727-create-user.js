'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      userName: {
        type: Sequelize.STRING
      },
      progileImg: {
        type: Sequelize.STRING
      },
      articleCount: {
        type: Sequelize.INTEGER
      },
      followerCount: {
        type: Sequelize.INTEGER
      },
      followCount: {
        type: Sequelize.INTEGER
      },
      nickName: {
        type: Sequelize.STRING
      },
      webSite: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};