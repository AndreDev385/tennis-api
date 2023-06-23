'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      queryInterface.bulkInsert("journey", [
          {
              name: ""
          }
      ])
  },

  async down (queryInterface, Sequelize) {
      queryInterface.bulkDelete("journey", {})
  }
};
