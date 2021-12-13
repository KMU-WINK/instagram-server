'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

        const articleId = await queryInterface.bulkInsert("articles", [
            {
                thumbnail: "comment test",
                location: "comment test",
                content: "content",
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], { returning: ["id"] })

        await queryInterface.bulkInsert("comments", [
            {
                article_id: articleId,
                content: "comment test",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                article_id: articleId,
                content: "comment test",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("comments", null, {});
    await queryInterface.bulkDelete("articles", null, {});

  }
};
