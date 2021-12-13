'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const userId = await queryInterface.bulkInsert("users", [
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
        ],{returning:["id"]})

        await queryInterface.bulkInsert("articles", [
            {
                user_id: userId,
                thumbnail: "thumbnail",
                location: "location",
                content: "content",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                user_id: userId,
                thumbnail: "thumbnail",
                location: "location",
                content: "content2",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                user_id: userId,
                thumbnail: "thumbnail",
                location: "location",
                content: "content3",
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ])
  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("articles", null, {});
  }
};
