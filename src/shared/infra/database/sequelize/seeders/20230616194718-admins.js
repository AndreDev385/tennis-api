"use strict";

const { v4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("users", [
            // admin
            {
                userId: v4(),
                email: "aizarra2015@gmail.com",
                password: "12345678",
                firstName: "Andre",
                lastName: "Izarra",
                canTrack: true,
                isAdmin: true,
            },
            // trackers
            {
                userId: v4(),
                email: "andre1@tracker.com",
                password: "12345678",
                firstName: "Andre",
                lastName: "Izarra",
                canTrack: true,
                isAdmin: false,
            },
            {
                userId: v4(),
                email: "andre2@tracker.com",
                password: "12345678",
                firstName: "Andre",
                lastName: "Izarra",
                canTrack: true,
                isAdmin: false,
            },
            // players
            {
                userId: v4(),
                email: "andre1@player.com",
                password: "12345678",
                firstName: "Andre",
                lastName: "Izarra",
                canTrack: false,
                isAdmin: false,
            },
            {
                userId: v4(),
                email: "andre2@player.com",
                password: "12345678",
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
