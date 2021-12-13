'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn("comments", "article_id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("comments", {
      fields: ["article_id"],
      type: "foreign key",
      name: "articles_comments_id_fk",
      references: {
        table: "articles",
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
     await queryInterface.removeColumn("comments", "article_id");
  }
};
