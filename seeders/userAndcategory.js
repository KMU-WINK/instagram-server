'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

        const articleId = await queryInterface.bulkInsert("users", [
            {
                email: "first",
                password: "password",
                userName: "userName",
                profileImg: "profileImg",
                nickName: "nickName",
                description: "description",
                createdAt: new Date(),
                updatedAt: new Date(),
                private: true,
            }
        ], { returning: ["id"] })

        await queryInterface.bulkInsert("categories", [
            {
                user_id: articleId,
                title: "#test",
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
    await queryInterface.bulkDelete("images", null, {});
    await queryInterface.bulkDelete("articles", null, {});

  }
};
