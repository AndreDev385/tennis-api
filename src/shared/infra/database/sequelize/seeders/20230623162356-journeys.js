"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.bulkInsert("journey", [
            {
                name: "J1",
            },
            {
                name: "J2",
            },
            {
                name: "J3",
            },
            {
                name: "J4",
            },
            {
                name: "J5",
            },
            {
                name: "J6",
            },
            {
                name: "J7",
            },
            {
                name: "J8",
            },
            {
                name: "J9",
            },
            {
                name: "8vos",
            },
            {
                name: "4tos",
            },
            {
                name: "Semi final",
            },
            {
                name: "Final",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        queryInterface.bulkDelete("journey", {});
    },
};
