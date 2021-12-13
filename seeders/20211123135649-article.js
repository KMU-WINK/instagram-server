'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert("articles", [
    //   {
    //     user_id:0,
    //     thumbnail:"https://asdoamsd.com",
    //     location:"남양주",
    //     content:"d응애",
    //     createdAt:new Date(),
    //     updatedAt:new Date(),
    //   }
    // ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
