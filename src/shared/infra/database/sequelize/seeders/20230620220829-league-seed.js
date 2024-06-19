"use strict";

const { v4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, _) {
        const leagueId = v4();
        await queryInterface.bulkInsert("league", [
            {
                leagueId,
                name: "CTA",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        const seasonId = v4();
        await queryInterface.bulkInsert("season", [
            {
                seasonId,
                leagueId,
                name: "Temporada 1 2024",
                isCurrentSeason: true,
                isFinish: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

    },

    async down(queryInterface, _) {
        await queryInterface.bulkDelete("league", null, {});
        await queryInterface.bulkDelete("season", null, {});
    },
};
