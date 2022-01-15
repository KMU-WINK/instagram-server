'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("follows", "from_user_id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("follows", "to_user_id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("follows", {
      fields: ["from_user_id"],
      type: "foreign key",
      // name: "user_follow_id_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("follows", {
      fields: ["to_user_id"],
      type: "foreign key",
      // name: "user_follow_id_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  };

  down: async (queryInterface, Sequelize) => {
    
  }
;