"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const CREATE_HOME_AD_TABLE = () =>
            queryInterface.createTable("homeAd", {
                image: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                link: {
                    type: Sequelize.STRING,
                    defaultValue: null,
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
            });

        const CREATE_BRACKET_TABLE = () =>
            queryInterface.createTable("bracket", {
                id: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    primaryKey: true,
                },
                contestId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                phase: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                matchId: {
                    type: Sequelize.UUID,
                    allowNull: true,
                },
                clashId: {
                    type: Sequelize.UUID,
                    allowNull: true,
                },
                left: {
                    type: Sequelize.UUID,
                    allowNull: true,
                },
                right: {
                    type: Sequelize.UUID,
                    allowNull: true,
                },
                parent: {
                    type: Sequelize.UUID,
                    allowNull: true,
                },
                rightPlace: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                leftPlace: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                deep: {
                    type: Sequelize.INTEGER,
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
            });

        const CREATE_CONTEST_TABLE = () =>
            queryInterface.createTable("contest", {
                contestId: {
                    type: Sequelize.UUID,
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
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
            });

        const CREATE_CONTEST_CLASH_TABLE = () =>
            queryInterface.createTable("contestClash", {
                contestClashId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    primaryKey: true,
                },
                contestId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                team1Id: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                team2Id: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                matchIds: {
                    type: Sequelize.ARRAY(Sequelize.UUID),
                    defaultValue: [],
                },
                t1WonClash: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
                    defaultValue: null,
                },
                isFinish: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
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
            });

        const CREATE_CONTEST_TEAM_TABLE = () =>
            queryInterface.createTable("contestTeam", {
                contestTeamId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    primaryKey: true,
                },
                contestId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                participantsIds: {
                    type: Sequelize.ARRAY(Sequelize.UUID),
                    defaultValue: [],
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
            });

        const CREATE_COUPLE_TABLE = () =>
            queryInterface.createTable("couple", {
                coupleId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    primaryKey: true,
                },
                p1Id: {
                    type: Sequelize.UUID,
                },
                p2Id: {
                    type: Sequelize.UUID,
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
            });

        const CREATE_PARTICIPANT_TABLE = () =>
            queryInterface.createTable(
                "participant",
                {
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
                { tableName: "participant" }
            );

        const CREATE_PARTICIPANT_TRACKER_TABLE = () =>
            queryInterface.createTable("participantTracker", {
                participantTrackerId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    primaryKey: true,
                },
                participantId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                tournamentId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                matchId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },

                isDouble: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                },
                // serv
                saveBreakPtsChances: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                breakPtsChances: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                breakPtsSaved: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                breakPts: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                firstServIn: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                secondServIn: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                aces: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                dobleFaults: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                firstServWon: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                secondServWon: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                pointsWinnedFirstServ: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                pointsWinnedSecondServ: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                gamesWonServing: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                gamesLostServing: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                gamesWonReturning: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                gamesLostReturning: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                // return
                firstReturnWon: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                secondReturnWon: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                firstReturnWinner: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                secondReturnWinner: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                firstReturnIn: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                secondReturnIn: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                firstReturnOut: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                secondReturnOut: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                pointsWinnedFirstReturn: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                pointsWinnedSecondReturn: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                // places
                meshPointsWon: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                meshPointsLost: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                meshWinner: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                meshError: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                bckgPointsWon: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                bckgPointsLost: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                bckgWinner: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                bckgError: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                // rally
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
                    image: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    address: {
                        type: Sequelize.STRING,
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
                { tableName: "tournament" }
            );

        const CREATE_TOURNAMENT_AD_TABLE = () =>
            queryInterface.createTable("tournamentAd", {
                tournamentId: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                image: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                link: {
                    type: Sequelize.STRING,
                    defaultValue: null,
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
            });

        const CREATE_TOURNAMENT_MATCH_TABLE = () =>
            queryInterface.createTable(
                "tournamentMatch",
                {
                    matchId: {
                        type: Sequelize.UUID,
                        allowNull: false,
                        primaryKey: true,
                    },
                    tournamentId: {
                        type: Sequelize.UUID,
                        allowNull: false,
                    },
                    contestId: {
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
                        allowNull: true,
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
                },
                { tableName: "tournamentMatch" }
            );

        const CREATE_TOURNAMENT_MATCH_TRACKER_TABLE = () =>
            queryInterface.createTable(
                "tournamentMatchTracker",
                {
                    trackerId: {
                        type: Sequelize.UUID,
                        allowNull: false,
                        primaryKey: true,
                    },
                    matchId: {
                        type: Sequelize.UUID,
                        allowNull: false,
                    },
                    playerTracker1: {
                        type: Sequelize.UUID,
                        allowNull: false,
                    },
                    playerTracker2: {
                        type: Sequelize.UUID,
                        allowNull: false,
                    },
                    playerTracker3: {
                        type: Sequelize.UUID,
                        allowNull: true,
                    },
                    playerTracker4: {
                        type: Sequelize.UUID,
                        allowNull: true,
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
                { tableName: "tournamentMatchTracker" }
            );

        await CREATE_HOME_AD_TABLE();
        await CREATE_BRACKET_TABLE();
        await CREATE_CONTEST_TABLE();
        await CREATE_CONTEST_CLASH_TABLE();
        await CREATE_CONTEST_TEAM_TABLE();
        await CREATE_COUPLE_TABLE();
        await CREATE_PARTICIPANT_TABLE();
        await CREATE_PARTICIPANT_TRACKER_TABLE();
        await CREATE_TOURNAMENTS_TABLE();
        await CREATE_TOURNAMENT_AD_TABLE();
        await CREATE_TOURNAMENT_MATCH_TABLE();
        await CREATE_TOURNAMENT_MATCH_TRACKER_TABLE();
    },

    async down(queryInterface, _) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.dropTable("homeAd", { transaction });
            await queryInterface.dropTable("bracket", { transaction });
            await queryInterface.dropTable("contest", { transaction });
            await queryInterface.dropTable("contestClash", { transaction });
            await queryInterface.dropTable("participantInscription,{transaction}")
            await queryInterface.dropTable("teamInscription,{transaction}")
            await queryInterface.dropTable("coupleInscription,{transaction}")
            await queryInterface.dropTable("contestTeam", { transaction });
            await queryInterface.dropTable("couple", { transaction });
            await queryInterface.dropTable("participant", { transaction });
            await queryInterface.dropTable("participantTracker", { transaction });
            await queryInterface.dropTable("tournament", { transaction });
            await queryInterface.dropTable("tournamentAd", { transaction });
            await queryInterface.dropTable("tournamentMatch", { transaction });
            await queryInterface.dropTable("tournamentMatchTracker", { transaction });
            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            throw e
        }
    },
};
