"use strict";

const { v4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("club", [
            {
                clubId: v4(),
                name: "Valle Arriba Athletic Club",
                symbol: "VAT",
                code: "Ax12sH",
            },
            {
                clubId: v4(),
                name: "Altamira Tenis Club",
                symbol: "ATC",
            },
            {
                clubId: v4(),
                name: "Caracas Country Club",
                symbol: "CCC",
            },
            {
                clubId: v4(),
                name: "Caracas Racquet Club",
                symbol: "CRC",
            },
            {
                clubId: v4(),
                name: "Caracas Sports Club",
                symbol: "CSC",
            },
            {
                clubId: v4(),
                name: "Caracas Teather Club",
                symbol: "CTC",
            },
            {
                clubId: v4(),
                name: "Centre Catala",
                symbol: "CAT",
            },
            {
                clubId: v4(),
                name: "Centro Asturiano de Caracas",
                symbol: "AST",
            },
            {
                clubId: v4(),
                name: "Centro Deportivo Hebraica",
                symbol: "HEB",
            },
            {
                clubId: v4(),
                name: "Centro Portugues",
                symbol: "POR",
            },
            {
                clubId: v4(),
                name: "Círculo Militar de Caracas",
                symbol: "CMC",
            },
            {
                clubId: v4(),
                name: "Club Campestre Los Cortijos",
                symbol: "CLC",
            },
            {
                clubId: v4(),
                name: "Club Hípico de Caracas",
                symbol: "HIP",
            },
            {
                clubId: v4(),
                name: "Club Miranda",
                symbol: "MIR",
            },
            {
                clubId: v4(),
                name: "Club Puerto Azul",
                symbol: "CPA",
            },
            {
                clubId: v4(),
                name: "Club Santa Paula",
                symbol: "CSP",
            },
            {
                clubId: v4(),
                name: "Club Táchira",
                symbol: "TAC",
            },
            {
                clubId: v4(),
                name: "Hermandad Gallega de Venezuela",
                symbol: "HGV",
            },
            {
                clubId: v4(),
                name: "Hogar Canario de Venezuela",
                symbol: "HCV",
            },
            {
                clubId: v4(),
                name: "Izcaragua Country Club",
                symbol: "IZC",
            },
            {
                clubId: v4(),
                name: "Lagunita Country Club",
                symbol: "LCC",
            },
            {
                clubId: v4(),
                name: "Monteclaro Country Club",
                symbol: "MON",
            },
            {
                clubId: v4(),
                name: "Valle Arriba Golf Club",
                symbol: "VAG",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        queryInterface.bulkDelete("club", {});
    },
};
