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

        await queryInterface.bulkInsert("club", [
            {
                clubId: v4(),
                name: "Valle Arriba",
                symbol: "VAR",
                address: "Colinas de Bello Monte",
                code: "Ax12sH",
            },
            {
                clubId: v4(),
                name: "Test",
                symbol: "TES",
                address: "direccion",
                code: "123123",
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("league", {});
        await queryInterface.bulkDelete("season", {});
        await queryInterface.bulkDelete("club", {});
    },
};
