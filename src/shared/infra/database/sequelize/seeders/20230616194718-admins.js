"use strict";

const { v4 } = require("uuid");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, _) {
        const SALT_ROUNDS = 5;

        const password = await bcrypt.hash("12345678", SALT_ROUNDS);

        await queryInterface.bulkInsert("users", [
            // admin test
            {
                userId: v4(),
                email: "aizarra2015@gmail.com",
                password,
                firstName: "Andre",
                lastName: "Izarra",
                canTrack: true,
                isAdmin: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // admins
            {
                userId: v4(),
                email: "joseraul333@gmail.com",
                password,
                firstName: "Raul",
                lastName: "Peña",
                canTrack: true,
                isAdmin: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: v4(),
                email: "onthecourt.academy@gmail.com",
                password,
                firstName: "Riccardo",
                lastName: "Gonzales",
                canTrack: true,
                isAdmin: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: v4(),
                email: "vivi.aure97@gmail.com",
                password,
                firstName: "Viviana",
                lastName: "Aure",
                canTrack: true,
                isAdmin: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // end admins
            // trackers 
            {
                userId: v4(),
                email: "cbarbosave@gmail.com",
                password,
                firstName: "Carlos",
                lastName: "Barboza",
                canTrack: true,
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: v4(),
                email: "rsamuel1601@gmail.com",
                password,
                firstName: "Ricardo",
                lastName: "Godoy",
                canTrack: true,
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: v4(),
                email: "27abrilsebas@gmail.com",
                password,
                firstName: "Sebastian",
                lastName: "Ochoa",
                canTrack: true,
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: v4(),
                email: "jhoncenteno98@gmail.com",
                password,
                firstName: "Jhon",
                lastName: "Centeno",
                canTrack: true,
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: v4(),
                email: "danreal01@gmail.com",
                password,
                firstName: "Daniel",
                lastName: "Hernández",
                canTrack: true,
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: v4(),
                email: "mariarosalba02@gmail.com",
                password,
                firstName: "Maria",
                lastName: "Peña",
                canTrack: true,
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: v4(),
                email: "ehburkle@gmail.com",
                password,
                firstName: "Erick",
                lastName: "Bürkle",
                canTrack: true,
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: v4(),
                email: "aejgonzalez11@gmail.com",
                password,
                firstName: "Andrés",
                lastName: "González",
                canTrack: true,
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: v4(),
                email: "diegoduboiss98@gmail.com",
                password,
                firstName: "Diego",
                lastName: "Dubois",
                canTrack: true,
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: v4(),
                email: "lucasgranatello@gmail.com",
                password,
                firstName: "Lucas",
                lastName: "Granatello",
                canTrack: true,
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: v4(),
                email: "josemiguelninja@gmail.com",
                password,
                firstName: "José Miguel",
                lastName: "Peña",
                canTrack: true,
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // end trackers
        ]);
    },

    async down(queryInterface, _) {
        await queryInterface.bulkDelete("users", null, {});
    },
};
