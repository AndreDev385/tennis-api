'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable("tournamentAd");
    await queryInterface.createTable("tournamentAd", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      tournamentId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tournamentAd");
    await queryInterface.createTable("tournamentAd", {
      tournamentId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
    })
  }
};
