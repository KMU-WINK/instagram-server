'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("articles", "user_id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("articles", {
      fields: ["user_id"],
      type: "foreign key",
      name: "users_articles_id_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.removeColumn("articles", "user_id");
  }
};
