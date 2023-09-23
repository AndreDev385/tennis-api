"use strict";

const { v4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
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
                name: "Temporada 2 2023",
                isCurrentSeason: true,
                isFinish: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("league", null, {});
        await queryInterface.bulkDelete("season", null, {});
    },
};
