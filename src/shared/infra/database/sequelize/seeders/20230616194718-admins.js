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
            {
                userId: v4(),
                email: "joseraul333@gmail.com",
                password,
                firstName: "Raul",
                lastName: "Peña",
                canTrack: true,
                isAdmin: true,
            },
            {
                userId: v4(),
                email: "onthecourt.academy@gmail.com",
                password,
                firstName: "Riccardo",
                lastName: "Gonzales",
                canTrack: true,
                isAdmin: true,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", {});
    },
};
