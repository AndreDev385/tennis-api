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
            },
        ]);

        const seasonId = v4();
        await queryInterface.bulkInsert("season", [
            {
                seasonId,
                leagueId,
                name: "Temporada 2 2023",
            },
        ]);

    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("league", {});
        await queryInterface.bulkDelete("season", {});
        await queryInterface.bulkDelete("club", {});
    },
};
