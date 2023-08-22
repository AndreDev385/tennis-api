"use strict";

const { Sequelize } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const CREATE_USER_TABLE = () =>
            queryInterface.createTable("users", {
                userId: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                email: {
                    type: Sequelize.STRING(250),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: true,
                    defaultValue: null,
                },
                firstName: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                lastName: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                recoverPasswordCode: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                canTrack: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                    allowNull: true,
                },
                isAdmin: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                    allowNull: true,
                },
                isPlayer: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                    allowNull: true,
                },
                accessToken: {
                    type: Sequelize.STRING(1000),
                    allowNull: true,
                    defaultValue: null,
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
            });

        const CREATE_CLUB_TABLE = () =>
            queryInterface.createTable("club", {
                clubId: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                symbol: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                code: {
                    type: Sequelize.STRING,
                    unique: true,
                    allowNull: true,
                    defaultValue: null,
                },
                isSubscribed: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
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

        const CREATE_CATEGORY_TABLE = () =>
            queryInterface.createTable("category", {
                categoryId: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                fullName: {
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
            });

        const CREATE_PLAYER_TABLE = () =>
            queryInterface.createTable("player", {
                playerId: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                clubId: {
                    type: Sequelize.UUID,
                    primaryKey: true,
                    allowNull: false,
                    references: {
                        model: "club",
                        key: "clubId",
                    },
                },
                userId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    primaryKey: true,
                    references: {
                        model: "users",
                        key: "userId",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                },
                avatar: {
                    type: Sequelize.STRING,
                    allowNull: true,
                    defaultValue: null,
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                updatedAt: {
                    allowNull: true,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
            });

        const CREATE_LEAGUE_TABLE = () =>
            queryInterface.createTable("league", {
                leagueId: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                name: {
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
            });

        const CREATE_SEASON_TABLE = () =>
            queryInterface.createTable("season", {
                seasonId: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                leagueId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    references: {
                        model: "league",
                        key: "leagueId",
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                isFinish: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                },
                isCurrentSeason: {
                    type: Sequelize.BOOLEAN,
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

        const CREATE_CLASH_TABLE = () =>
            queryInterface.createTable("clash", {
                clashId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    defaultValue: Sequelize.UUIDV4,
                    primaryKey: true,
                },
                categoryId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    references: {
                        model: "category",
                        key: "categoryId",
                    },
                },
                team1: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                team2: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                journey: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                seasonId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    references: {
                        model: "season",
                        key: "seasonId",
                    },
                },
                host: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                isFinish: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
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

        const CREATE_MATCH_TABLE = () =>
            queryInterface.createTable("match", {
                matchId: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                clashId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    references: {
                        model: "clash",
                        key: "clashId",
                    },
                },
                mode: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                categoryId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    references: {
                        model: "category",
                        key: "categoryId",
                    },
                },
                setsQuantity: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                sets: {
                    type: Sequelize.ARRAY(Sequelize.JSON),
                    allowNull: true,
                },
                gamesPerSet: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                superTieBreak: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                },
                address: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                surface: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                player1: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                player2: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                player3: {
                    type: Sequelize.UUID,
                    allowNull: true,
                },
                player4: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                isLive: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                },
                isFinish: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                },
                isCancelled: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
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

        const CREATE_TRACKER_TABLE = () =>
            queryInterface.createTable("tracker", {
                trackerId: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                me: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                partner: {
                    type: Sequelize.UUID,
                    allowNull: true,
                },
                matchId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    primaryKey: true,
                    references: {
                        model: "match",
                        key: "matchId",
                    },
                },

                gamesWonServing: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                gamesWonReturning: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                gamesLostServing: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                gamesLostReturning: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                winBreakPtsChances: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                breakPtsWinned: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },

                rivalPointsWinnedFirstServ: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },
                rivalPointsWinnedSecondServ: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },
                rivalFirstServIn: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },
                rivalSecondServIn: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },
                rivalPointsWinnedFirstReturn: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },
                rivalPointsWinnedSecondReturn: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },
                rivalFirstReturnIn: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },
                rivalSecondReturnIn: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },

                rivalAces: {
                    defaultValue: 0,
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                rivalDobleFault: {
                    defaultValue: 0,
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                rivalNoForcedErrors: {
                    defaultValue: 0,
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                rivalWinners: {
                    defaultValue: 0,
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                shortRallyWon: {
                    defaultValue: 0,
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                mediumRallyWon: {
                    defaultValue: 0,
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                longRallyWon: {
                    defaultValue: 0,
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                shortRallyLost: {
                    defaultValue: 0,
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                mediumRallyLost: {
                    defaultValue: 0,
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                longRallyLost: {
                    defaultValue: 0,
                    type: Sequelize.INTEGER,
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

        const CREATE_PLAYER_TRACKER_TABLE = () =>
            queryInterface.createTable("playerTracker", {
                playerTrackerId: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                playerId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                seasonId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                pointsWon: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                pointsWonServing: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                pointsWonReturning: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                pointsLost: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                pointsLostReturning: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                pointsLostServing: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                saveBreakPtsChances: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                breakPtsSaved: {
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
                firstServIn: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },
                secondServIn: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: false,
                },
                aces: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },
                dobleFaults: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },
                pointsWinnedFirstReturn: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },
                pointsWinnedSecondReturn: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },
                firstReturnIn: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },
                secondReturnIn: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },
                meshPointsWon: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },
                meshPointsLost: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },
                bckgPointsWon: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },
                bckgPointsLost: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },
                winners: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: true,
                },
                noForcedErrors: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
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

        const CREATE_JOURNEY_TABLE = () =>
            queryInterface.createTable("journey", {
                name: {
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
            });

        const CREATE_TEAM_TABLE = () =>
            queryInterface.createTable("team", {
                teamId: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                clubId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    references: {
                        model: "club",
                        key: "clubId",
                    },
                },
                categoryId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    references: {
                        model: "category",
                        key: "categoryId",
                    },
                },
                name: {
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
            });

        const CREATE_TEAM_STATS_TABLE = () =>
            queryInterface.createTable(
                "teamStats",
                {
                    teamStatsId: {
                        type: Sequelize.UUID,
                        defaultValue: Sequelize.UUIDV4,
                        allowNull: false,
                        primaryKey: true,
                    },
                    teamId: {
                        type: Sequelize.UUID,
                        allowNull: false,
                        references: {
                            model: "team",
                            key: "teamId",
                        },
                    },
                    seasonId: {
                        type: Sequelize.UUID,
                        allowNull: false,
                        references: {
                            model: "season",
                            key: "seasonId",
                        },
                    },
                    journey: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    gamesWonAsLocal: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    gamesPlayedAsLocal: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    gamesWonAsVisitor: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    gamesPlayedAsVisitor: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    //sets
                    setsWonAsLocal: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    setsPlayedAsLocal: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    setsWonAsVisitor: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    setsPlayedAsVisitor: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    // super tie-break
                    superTieBreaksWonAsLocal: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    superTieBreaksPlayedAsLocal: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    superTieBreaksWonAsVisitor: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    superTieBreaksPlayedAsVisitor: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    // matchs
                    matchWonAsLocal: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    matchLostAsLocal: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    matchPlayedAsLocal: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    matchWonAsVisitor: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    matchLostAsVisitor: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    matchPlayedAsVisitor: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    // match won with first set won
                    matchsWonWithFirstSetWonAsLocal: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    matchsPlayedWithFirstSetWonAsLocal: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    matchsWonWithFirstSetWonAsVisitor: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    matchsPlayedWithFirstSetWonAsVisitor: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    // clash won
                    clashWonAsLocal: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    clashPlayedAsLocal: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    clashWonAsVisitor: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    clashPlayedAsVisitor: {
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
                { tableName: "teamStats" }
            );

        const CREATE_RANKING_TABLE = () =>
            queryInterface.createTable(
                "ranking",
                {
                    rankingId: {
                        type: Sequelize.UUID,
                        defaultValue: Sequelize.UUIDV4,
                        allowNull: false,
                        primaryKey: true,
                    },
                    position: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    teamId: {
                        type: Sequelize.UUID,
                        allowNull: false,
                        references: {
                            model: "team",
                            key: "teamId",
                        },
                    },
                    seasonId: {
                        type: Sequelize.UUID,
                        allowNull: false,
                        references: {
                            model: "season",
                            key: "seasonId",
                        },
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
                { tableName: "ranking" }
            );

        await CREATE_USER_TABLE();
        await CREATE_CLUB_TABLE();
        await CREATE_CATEGORY_TABLE();
        await CREATE_PLAYER_TABLE();
        await CREATE_LEAGUE_TABLE();
        await CREATE_SEASON_TABLE();
        await CREATE_TEAM_TABLE();
        await CREATE_CLASH_TABLE();
        await CREATE_MATCH_TABLE();
        await CREATE_TRACKER_TABLE();
        await CREATE_PLAYER_TRACKER_TABLE();
        await CREATE_JOURNEY_TABLE();
        await CREATE_TEAM_STATS_TABLE();
        await CREATE_RANKING_TABLE();
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("users");
        await queryInterface.dropTable("club");
        await queryInterface.dropTable("category");
        await queryInterface.dropTable("player");
        await queryInterface.dropTable("league");
        await queryInterface.dropTable("season");
        await queryInterface.dropTable("clash");
        await queryInterface.dropTable("match");
        await queryInterface.dropTable("tracker");
        await queryInterface.dropTable("playerTracker");
        await queryInterface.dropTable("journey");
        await queryInterface.dropTable("team");
        await queryInterface.dropTable("teamStats");
        await queryInterface.dropTable("ranking");
    },
};
//# sourceMappingURL=20230616182354-migration.js.map
