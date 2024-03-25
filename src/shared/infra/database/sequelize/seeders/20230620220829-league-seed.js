"use strict";

import { v4 } from "uuid";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, _) {
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
}
export async function down(queryInterface, _) {
    await queryInterface.bulkDelete("league", null, {});
    await queryInterface.bulkDelete("season", null, {});
}
