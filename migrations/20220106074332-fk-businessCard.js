'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("businessCards", "user_id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("businessCards", {
      fields: ["user_id"],
      type: "foreign key",
      name: "users_businessCards_id_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
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
