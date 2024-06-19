"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "email", {
      type: Sequelize.STRING(250),
      allowNull: true,
      unique: true,
    });

    await queryInterface.addColumn("users", "ci", {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "email", {
      type: Sequelize.STRING(250),
      allowNull: false,
      unique: true,
    });

    await queryInterface.removeColumn("users", "ci");
  },
};
