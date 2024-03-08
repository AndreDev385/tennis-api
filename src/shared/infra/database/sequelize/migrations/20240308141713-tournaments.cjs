'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const CREATE_TOURNAMENTS_TABLE = () =>
      queryInterface.createTable(
        "tournament",
        {
          tournamentId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
          name: {
            type: Sequelize.UUID,
            allowNull: false,
          },
          rules: {
            type: Sequelize.JSON,
            allowNull: false,
          },
          status: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          createdAt: {
            allowNull: true,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
          updatedAt: {
            allowNull: true,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
        },
      );

    await CREATE_TOURNAMENTS_TABLE();
  },

  async down(queryInterface, _) {
    queryInterface.dropTable("tournament")
  }
};
