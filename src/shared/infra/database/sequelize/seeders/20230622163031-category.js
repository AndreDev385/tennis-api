"use strict";

const { v4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("category", [
            {
                categoryId: v4(),
                name: "3F",
                fullName: "3ra Femenina"
            },
            {
                categoryId: v4(),
                name: "3M",
                fullName: "3ra Masculina"
            },
            {
                categoryId: v4(),
                name: "4F",
                fullName: "4ta Femenina"
            },
            {
                categoryId: v4(),
                name: "4M",
                fullName: "4ta Masculina"
            },

            {
                categoryId: v4(),
                name: "5F",
                fullName: "5ta Femenina"
            },
            {
                categoryId: v4(),
                name: "5M",
                fullName: "5ta Masculina"
            },
            {
                categoryId: v4(),
                name: "5MM",
                fullName: "5ta Masculina Master",
            },
            {
                categoryId: v4(),
                name: "6F",
                fullName: "6ta Femenina"
            },
            {
                categoryId: v4(),
                name: "6M",
                fullName: "6ta Masculina"
            },
            {
                categoryId: v4(),
                name: "6MM",
                fullName: "6ta Masculina Master"
            },
            {
                categoryId: v4(),
                name: "DM",
                fullName: "Mixto"
            },
            {
                categoryId: v4(),
                name: "FEM-MM",
                fullName: "Femenina Master"
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("category", {});
    },
};
