"use strict";

const { v4 } = require("uuid");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const SALT_ROUNDS = 5;

        const password = await bcrypt.hash("12345678", SALT_ROUNDS);

        await queryInterface.bulkInsert("users", [
            // admin
            {
                userId: v4(),
                email: "aizarra2015@gmail.com",
                password,
                firstName: "Andre",
                lastName: "Izarra",
                canTrack: true,
                isAdmin: true,
            },
            // trackers
            {
                userId: v4(),
                email: "andre1@tracker.com",
                password,
                firstName: "Andre",
                lastName: "Izarra",
                canTrack: true,
                isAdmin: false,
            },
            {
                userId: v4(),
                email: "andre2@tracker.com",
                password,
                firstName: "Andre",
                lastName: "Izarra",
                canTrack: true,
                isAdmin: false,
            },
            // players
            {
                userId: v4(),
                email: "andre1@player.com",
                password,
                firstName: "Andre",
                lastName: "Izarra",
                canTrack: false,
                isAdmin: false,
            },
            {
                userId: v4(),
                email: "andre2@player.com",
                password,
                firstName: "Andre",
                lastName: "Izarra",
                canTrack: false,
                isAdmin: false,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("users", {});
    },
};
