'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "backgroundImage", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("users", "themaColor", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("users", "selectedCategory", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
