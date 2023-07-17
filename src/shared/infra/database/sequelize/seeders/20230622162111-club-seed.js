"use strict";

const { v4 } = require("uuid");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const clubId = v4();

        await queryInterface.bulkInsert("club", [
            {
                clubId,
                name: "Valle Arriba Athletic Club",
                symbol: "VAT",
                isSubscribed: true,
                code: "Ax12sH",
            },
            {
                clubId: v4(),
                name: "Altamira Tenis Club",
                symbol: "ATC",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Caracas Country Club",
                symbol: "CCC",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Caracas Racquet Club",
                symbol: "CRC",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Caracas Sports Club",
                symbol: "CSC",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Caracas Teather Club",
                symbol: "CTC",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Centre Catala",
                symbol: "CAT",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Centro Asturiano de Caracas",
                symbol: "AST",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Centro Deportivo Hebraica",
                symbol: "HEB",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Centro Portugues",
                symbol: "POR",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Círculo Militar de Caracas",
                symbol: "CMC",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Club Campestre Los Cortijos",
                symbol: "CLC",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Club Hípico de Caracas",
                symbol: "HIP",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Club Miranda",
                symbol: "MIR",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Club Puerto Azul",
                symbol: "CPA",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Club Santa Paula",
                symbol: "CSP",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Club Táchira",
                symbol: "TAC",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Hermandad Gallega de Venezuela",
                symbol: "HGV",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Hogar Canario de Venezuela",
                symbol: "HCV",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Izcaragua Country Club",
                symbol: "IZC",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Lagunita Country Club",
                symbol: "LCC",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Monteclaro Country Club",
                symbol: "MON",
                isSubscribed: false,
            },
            {
                clubId: v4(),
                name: "Valle Arriba Golf Club",
                symbol: "VAG",
                isSubscribed: false,
            },
        ]);

        /* Players for test */
        const userId1 = v4();
        const userId2 = v4();
        const userId3 = v4();
        const userId4 = v4();
        const userId5 = v4();
        const userId6 = v4();
        const userId7 = v4();
        const userId8 = v4();
        const userId9 = v4();

        const SALT_ROUNDS = 5;
        const password = await bcrypt.hash("12345678", SALT_ROUNDS);

        await queryInterface.bulkInsert("users", [
            {
                userId: userId1,
                email: "player1@player.com",
                password,
                firstName: "one",
                lastName: "player",
                isPlayer: true,
            },
            {
                userId: userId2,
                email: "player2@player.com",
                password,
                firstName: "two",
                lastName: "player",
                isPlayer: true,
            },
            {
                userId: userId3,
                email: "player3@player.com",
                password,
                firstName: "three",
                lastName: "player",
                isPlayer: true,
            },
            {
                userId: userId4,
                email: "player4@player.com",
                password,
                firstName: "four",
                lastName: "player",
                isPlayer: true,
            },
            {
                userId: userId5,
                email: "player5@player.com",
                password,
                firstName: "five",
                lastName: "player",
                isPlayer: true,
            },
            {
                userId: userId6,
                email: "player6@player.com",
                password,
                firstName: "six",
                lastName: "player",
                isPlayer: true,
            },
            {
                userId: userId7,
                email: "player7@player.com",
                password,
                firstName: "seven",
                lastName: "player",
                isPlayer: true,
            },
            {
                userId: userId8,
                email: "player8@player.com",
                password,
                firstName: "eight",
                lastName: "player",
                isPlayer: true,
            },
            {
                userId: userId9,
                email: "player9@player.com",
                password,
                firstName: "nine",
                lastName: "player",
                isPlayer: true,
            },
        ]);

        await queryInterface.bulkInsert("player", [
            {
                playerId: v4(),
                clubId,
                userId: userId1,
            },
            {
                playerId: v4(),
                clubId,
                userId: userId2,
            },
            {
                playerId: v4(),
                clubId,
                userId: userId3,
            },
            {
                playerId: v4(),
                clubId,
                userId: userId4,
            },
            {
                playerId: v4(),
                clubId,
                userId: userId5,
            },
            {
                playerId: v4(),
                clubId,
                userId: userId6,
            },
            {
                playerId: v4(),
                clubId,
                userId: userId7,
            },
            {
                playerId: v4(),
                clubId,
                userId: userId8,
            },
            {
                playerId: v4(),
                clubId,
                userId: userId9,
            },
        ]);
        /* Players for test */
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("club", {});
    },
};
