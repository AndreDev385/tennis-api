"use strict";

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
                accessToken: {
                    type: Sequelize.STRING(500),
                    allowNull: true,
                    defaultValue: null,
                },
                isDeleted: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
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
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
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
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
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
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
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
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
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
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
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
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
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
                    unique: true,
                },
                player2: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                player3: {
                    type: Sequelize.UUID,
                    allowNull: true,
                    unique: true,
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
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
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
                    allowNull: true,
                },
                rivalPointsWinnedSecondServ: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                rivalFirstServIn: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                rivalSecondServIn: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                rivalPointsWinnedFirstReturn: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                rivalPointsWinnedSecondReturn: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                rivalFirstReturnIn: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                rivalSecondReturnIn: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },

                rivalAces: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                rivalDobleFault: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                rivalNoForcedErrors: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                rivalWinners: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                shortRallyWon: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                mediumRallyWon: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                longRallyWon: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                shortRallyLost: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                mediumRallyLost: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                longRallyLost: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
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
                    allowNull: true,
                },
                secondServIn: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                aces: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                dobleFaults: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                pointsWinnedFirstReturn: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                pointsWinnedSecondReturn: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                firstReturnIn: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                secondReturnIn: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                meshPointsWon: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                meshPointsLost: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                bckgPointsWon: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                bckgPointsLost: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                winners: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                noForcedErrors: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
            });

        const CREATE_JOURNEY_TABLE = () =>
            queryInterface.createTable("journey", {
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
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
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
            });

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
    },
};
//# sourceMappingURL=20230616182354-migration.js.map
