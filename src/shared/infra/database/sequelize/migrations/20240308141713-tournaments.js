"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const CREATE_TOURNAMENT_MATCH_TRACKER_TABLE = () =>
            queryInterface.createTable("tournamentMatchTracker", {
                matchId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                player1: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                player2: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                player3: {
                    type: Sequelize.UUID,
                    allowNull: true,
                },
                player4: {
                    type: Sequelize.UUID,
                    allowNull: true,
                },
                shortRallyWon: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                shortRallyLost: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                mediumRallyWon: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                mediumRallyLost: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                longRallyWon: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                longRallyLost: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
            });

        const CREATE_TOURNAMENT_MATCH_TABLE = () =>
            queryInterface.createTable("tournamentMatch", {
                tournamentId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                rules: {
                    type: Sequelize.JSON,
                    allowNull: false,
                },
                mode: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                surface: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                sets: {
                    type: Sequelize.ARRAY(Sequelize.JSON),
                    allowNull: true,
                },
                superTieBreak: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                },
                player1Id: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                player2Id: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                player3Id: {
                    type: Sequelize.UUID,
                    allowNull: true,
                },
                player4Id: {
                    type: Sequelize.UUID,
                    allowNull: true,
                },
                trackerId: {
                    type: Sequelize.UUID,
                    allowNull: true,
                },
                status: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                matchInfo: {
                    type: Sequelize.JSON,
                    allowNull: true,
                },
                matchWon: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
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
            });

        const CREATE_PARTICIPANT_TABLE = () =>
            queryInterface.createTable("participant", {
                participantId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    primaryKey: true,
                },
                userId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    references: {
                        model: "users",
                        key: "userId",
                    },
                },
                avatar: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                device: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                isDeleted: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                },
            });

        const CREATE_TOURNAMENTS_TABLE = () =>
            queryInterface.createTable("tournament", {
                tournamentId: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                name: {
                    type: Sequelize.STRING,
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
                startDate: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                endDate: {
                    type: Sequelize.DATE,
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
            });

        const CREATE_CONTEST_TABLE = () =>
            queryInterface.createTable("contest", {
                contestId: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                tournamentId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                mode: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                categoryType: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                category: {
                    type: Sequelize.JSON,
                    allowNull: true,
                },
                summation: {
                    type: Sequelize.JSON,
                    allowNull: true,
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
            });

        await CREATE_TOURNAMENT_MATCH_TRACKER_TABLE();
        await CREATE_TOURNAMENT_MATCH_TABLE();
        await CREATE_TOURNAMENTS_TABLE();
        await CREATE_PARTICIPANT_TABLE();
        await CREATE_CONTEST_TABLE();
    },

    async down(queryInterface, _) {
        await queryInterface.dropTable("tournament");
        await queryInterface.dropTable("tournamentMatchTracker");
        await queryInterface.dropTable("tournamentMatch");
        await queryInterface.dropTable("participant");
        await queryInterface.dropTable("contest");
    },
};
