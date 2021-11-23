'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        email:"hpyho33@kookmin.ac.kr",
        password:"test",
        userName:"ChanHHOO",
        profileImg:"https://asdasd.com",
        nickName:"ChanHHOO",
        description:"hi there",
        createdAt:new Date(),
        updatedAt:new Date(),
        private:false,
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
  }
};
