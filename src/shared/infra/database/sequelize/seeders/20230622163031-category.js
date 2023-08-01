"use strict";

const { v4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("category", [
            {
                categoryId: v4(),
                name: "3F",
                fullName: "3ra Femenina",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                categoryId: v4(),
                name: "3M",
                fullName: "3ra Masculina",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                categoryId: v4(),
                name: "4F",
                fullName: "4ta Femenina",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                categoryId: v4(),
                name: "4M",
                fullName: "4ta Masculina",
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            {
                categoryId: v4(),
                name: "5F",
                fullName: "5ta Femenina",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                categoryId: v4(),
                name: "5M",
                fullName: "5ta Masculina",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                categoryId: v4(),
                name: "5MM",
                fullName: "5ta Masculina Master",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                categoryId: v4(),
                name: "6F",
                fullName: "6ta Femenina",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                categoryId: v4(),
                name: "6M",
                fullName: "6ta Masculina",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                categoryId: v4(),
                name: "6MM",
                fullName: "6ta Masculina Master",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                categoryId: v4(),
                name: "DM",
                fullName: "Mixto",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                categoryId: v4(),
                name: "FEM-MM",
                fullName: "Femenina Master",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("category", {});
    },
};
