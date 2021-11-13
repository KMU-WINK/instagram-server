'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        email:"hpyho33@kookmin.ac.kr",
        password:"test",
        userName:"ChanHHOO",
        progileImg:"https://asdasd.com",
        articleCount:1,
        followerCount:11,
        followCount:111,
        nickName:"ChanHHOO",
        webSite:"https://veloper.com",
        description:"hi there",
        phoneNumber:"010-1234-6789",
        sex:"male",
        createdAt:new Date(),
        updatedAt:new Date(),
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
