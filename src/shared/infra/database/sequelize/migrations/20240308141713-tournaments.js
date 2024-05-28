"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // TODO: change DataTypes with Sequelize
        // TODO: add createdAt and UpdatedAt

        const CREATE_HOME_AD_TABLE = () =>
            queryInterface.createTable("homeAd", {
                image: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                link: {
                    type: DataTypes.STRING,
                    defaultValue: null,
                },
            });

        const CREATE_BRACKET_TABLE = () =>
            queryInterface.createTable("bracket", {
                id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    primaryKey: true,
                },
                contestId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                phase: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                matchId: {
                    type: DataTypes.UUID,
                    allowNull: true,
                },
                clashId: {
                    type: DataTypes.UUID,
                    allowNull: true,
                },
                left: {
                    type: DataTypes.UUID,
                    allowNull: true,
                },
                right: {
                    type: DataTypes.UUID,
                    allowNull: true,
                },
                parent: {
                    type: DataTypes.UUID,
                    allowNull: true,
                },
                rightPlace: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                leftPlace: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                deep: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            });

        const CREATE_CONTEST_TABLE = () =>
            queryInterface.createTable("contest", {
                contestId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    primaryKey: true,
                },
                tournamentId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                mode: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                categoryType: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                category: {
                    type: DataTypes.JSON,
                    allowNull: true,
                },
                summation: {
                    type: DataTypes.JSON,
                    allowNull: true,
                },
            });

        const CREATE_CONTEST_CLASH_TABLE = () =>
            queryInterface.createTable("contestClash", {
                contestClashId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    primaryKey: true,
                },
                contestId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                team1Id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                team2Id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                matchIds: {
                    type: DataTypes.ARRAY(DataTypes.UUID),
                    defaultValue: [],
                },
                t1WonClash: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                    defaultValue: null,
                },
                isFinish: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
            });

        const CREATE_CONTEST_TEAM_TABLE = () =>
            queryInterface.createTable("contestTeam", {
                contestTeamId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    primaryKey: true,
                },
                contestId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                participantsIds: {
                    type: DataTypes.ARRAY(DataTypes.UUID),
                    defaultValue: [],
                },
            });

        const CREATE_COUPLE_TABLE = () =>
            queryInterface.createTable("couple", {
                coupleId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    primaryKey: true,
                },
                p1Id: {
                    type: DataTypes.UUID,
                },
                p2Id: {
                    type: DataTypes.UUID,
                },
            });

        const CREATE_PARTICIPANT_TABLE = () =>
            queryInterface.createTable(
                "participant",
                {
                    participantId: {
                        type: DataTypes.UUID,
                        allowNull: false,
                        primaryKey: true,
                    },
                    userId: {
                        type: DataTypes.UUID,
                        allowNull: false,
                        references: {
                            model: "users",
                            key: "userId",
                        },
                    },
                    avatar: {
                        type: DataTypes.STRING,
                        allowNull: true,
                    },
                    device: {
                        type: DataTypes.STRING,
                        allowNull: true,
                    },
                    isDeleted: {
                        type: DataTypes.BOOLEAN,
                        defaultValue: false,
                    },
                },
                { tableName: "participant" }
            );

        const CREATE_PARTICIPANT_TRACKER_TABLE = () =>
            queryInterface.createTable("participantTracker", {
                participantTrackerId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    primaryKey: true,
                },
                participantId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                tournamentId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                matchId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },

                isDouble: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
                // serv
                saveBreakPtsChances: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                breakPtsChances: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                breakPtsSaved: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                breakPts: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                firstServIn: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                secondServIn: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                aces: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                dobleFaults: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                firstServWon: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                secondServWon: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                pointsWinnedFirstServ: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                pointsWinnedSecondServ: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                gamesWonServing: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                gamesLostServing: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                gamesWonReturning: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                gamesLostReturning: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                // return
                firstReturnWon: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                secondReturnWon: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                firstReturnWinner: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                secondReturnWinner: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                firstReturnIn: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                secondReturnIn: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                firstReturnOut: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                secondReturnOut: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                pointsWinnedFirstReturn: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                pointsWinnedSecondReturn: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                // places
                meshPointsWon: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                meshPointsLost: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                meshWinner: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                meshError: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                bckgPointsWon: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                bckgPointsLost: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                bckgWinner: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                bckgError: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                // rally
                shortRallyWon: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                shortRallyLost: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                mediumRallyWon: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                mediumRallyLost: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                longRallyWon: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                longRallyLost: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                createdAt: {
                    allowNull: true,
                    type: DataTypes.DATE,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                updatedAt: {
                    allowNull: true,
                    type: DataTypes.DATE,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
            });

        const CREATE_TOURNAMENTS_TABLE = () =>
            queryInterface.createTable(
                "tournament",
                {
                    tournamentId: {
                        type: DataTypes.UUID,
                        defaultValue: DataTypes.UUIDV4,
                        allowNull: false,
                        primaryKey: true,
                    },
                    name: {
                        type: DataTypes.STRING,
                        allowNull: false,
                    },
                    rules: {
                        type: DataTypes.JSON,
                        allowNull: false,
                    },
                    status: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                    },
                    startDate: {
                        type: DataTypes.DATE,
                        allowNull: false,
                    },
                    endDate: {
                        type: DataTypes.DATE,
                        allowNull: false,
                    },
                    image: {
                        type: DataTypes.STRING,
                        allowNull: false,
                    },
                    createdAt: {
                        allowNull: true,
                        type: DataTypes.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                    },
                    updatedAt: {
                        allowNull: true,
                        type: DataTypes.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                    },
                },
                { tableName: "tournament" }
            );

        const CREATE_TOURNAMENT_AD_TABLE = () =>
            queryInterface.createTable("tournamentAd", {
                tournamentId: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                image: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                link: {
                    type: DataTypes.STRING,
                    defaultValue: null,
                },
            });

        const CREATE_TOURNAMENT_MATCH_TABLE = () =>
            queryInterface.createTable(
                "tournamentMatch",
                {
                    matchId: {
                        type: DataTypes.UUID,
                        allowNull: false,
                        primaryKey: true,
                    },
                    tournamentId: {
                        type: DataTypes.UUID,
                        allowNull: false,
                    },
                    contestId: {
                        type: DataTypes.UUID,
                        allowNull: false,
                    },
                    rules: {
                        type: DataTypes.JSON,
                        allowNull: false,
                    },
                    mode: {
                        type: DataTypes.STRING,
                        allowNull: false,
                    },
                    surface: {
                        type: DataTypes.STRING,
                        allowNull: false,
                    },
                    sets: {
                        type: DataTypes.ARRAY(DataTypes.JSON),
                        allowNull: true,
                    },
                    superTieBreak: {
                        type: DataTypes.BOOLEAN,
                        allowNull: true,
                    },
                    player1Id: {
                        type: DataTypes.UUID,
                        allowNull: false,
                    },
                    player2Id: {
                        type: DataTypes.UUID,
                        allowNull: false,
                    },
                    player3Id: {
                        type: DataTypes.UUID,
                        allowNull: true,
                    },
                    player4Id: {
                        type: DataTypes.UUID,
                        allowNull: true,
                    },
                    trackerId: {
                        type: DataTypes.UUID,
                        allowNull: true,
                    },
                    status: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                    },
                    matchInfo: {
                        type: DataTypes.JSON,
                        allowNull: true,
                    },
                    matchWon: {
                        type: DataTypes.BOOLEAN,
                        allowNull: true,
                    },
                    createdAt: {
                        allowNull: true,
                        type: DataTypes.DATE,
                        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                    },
                    updatedAt: {
                        allowNull: true,
                        type: DataTypes.DATE,
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
                        type: DataTypes.UUID,
                        allowNull: false,
                        primaryKey: true,
                    },
                    matchId: {
                        type: DataTypes.UUID,
                        allowNull: false,
                    },
                    playerTracker1: {
                        type: DataTypes.UUID,
                        allowNull: false,
                    },
                    playerTracker2: {
                        type: DataTypes.UUID,
                        allowNull: false,
                    },
                    playerTracker3: {
                        type: DataTypes.UUID,
                        allowNull: true,
                    },
                    playerTracker4: {
                        type: DataTypes.UUID,
                        allowNull: true,
                    },
                },
                { tableName: "tournamentMatchTracker" }
            );

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
        await queryInterface.dropTable("bracket");
        await queryInterface.dropTable("contest");
        await queryInterface.dropTable("contestClash");
        await queryInterface.dropTable("contestTeam");
        await queryInterface.dropTable("couple");
        await queryInterface.dropTable("participant");
        await queryInterface.dropTable("participantTracker");
        await queryInterface.dropTable("tournament");
        await queryInterface.dropTable("tournamentAd");
        await queryInterface.dropTable("tournamentMatch");
        await queryInterface.dropTable("tournamentMatchTracker");
    },
};
