"use strict";

const { v4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("category", [
            {
                categoryId: v4(),
                name: "3F",
            },
            {
                categoryId: v4(),
                name: "3M",
            },
            {
                categoryId: v4(),
                name: "4F",
            },
            {
                categoryId: v4(),
                name: "4M",
            },

            {
                categoryId: v4(),
                name: "5F",
            },
            {
                categoryId: v4(),
                name: "5M",
            },
            {
                categoryId: v4(),
                name: "5MM",
            },
            {
                categoryId: v4(),
                name: "6F",
            },
            {
                categoryId: v4(),
                name: "6M",
            },
            {
                categoryId: v4(),
                name: "6MM",
            },
            {
                categoryId: v4(),
                name: "DM",
            },
            {
                categoryId: v4(),
                name: "FEM-MM",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("category", {});
    },
};
