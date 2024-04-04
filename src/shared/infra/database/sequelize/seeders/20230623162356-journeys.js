"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, _) {
        await queryInterface.bulkInsert("journey", [
            {
                name: "J1",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "J2",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "J3",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "J4",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "J5",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "J6",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "J7",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "J8",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "J9",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "8vos",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "4tos",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "3er puesto",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Semi final",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Final",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, _) {
        await queryInterface.bulkDelete("journey", null, {});
    },
};
