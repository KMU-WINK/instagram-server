'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 아티클 아이디 컬럼 추가가 필요하시면 주석을 풀어주세요.

    // await queryInterface.addColumn("images", "article_id", {
    //   type: Sequelize.INTEGER,
    // });
    // await queryInterface.addConstraint("images", {
    //   fields: ["article_id"],
    //   type: "foreign key",
    //   name: "articles_images_id_fk",
    //   references: {
    //     table: "articles",
    //     field: "id",
    //   },
    //   onDelete: "cascade",
    //   onUpdate: "cascade",
    // });
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
