'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "pausedMatch",
            {
                matchId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    primaryKey: true,
                },
                mode: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                setsQuantity: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                surface: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                gamesPerSet: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                superTiebreak: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
                },
                direction: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                statistics: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                player1: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                player2: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                player3: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                player4: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                initialTeam: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                doubleServeFlow: {
                    type: Sequelize.JSON,
                    allowNull: true
                },
                singleServeFlow: {
                    type: Sequelize.JSON,
                    allowNull: true
                },
                sets: {
                    type: Sequelize.ARRAY(Sequelize.JSON),
                    allowNull: true,
                },
                currentSetIdx: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                currentGame: {
                    type: Sequelize.JSON,
                    allowNull: false,
                },
                setsWon: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                setsLost: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                matchWon: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
                },
                matchFinish: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
            },
            { tableName: "pausedMatch" }
        )
    },

    async down(queryInterface, _) {
        await queryInterface.dropTable("pausedMatch");
    }
};
