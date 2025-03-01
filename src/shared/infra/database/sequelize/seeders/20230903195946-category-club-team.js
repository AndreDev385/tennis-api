'use strict';

const { v4 } = require("uuid");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, _) {
        const clubIdVAT = v4();

        await queryInterface.bulkInsert("club", [
            {
                clubId: clubIdVAT,
                name: "Valle Arriba Athletic Club",
                symbol: "VAT",
                isSubscribed: true,
                code: "Ax12sH",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Altamira Tenis Club",
                symbol: "ATC",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Caracas Country Club",
                symbol: "CCC",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Caracas Racquet Club",
                symbol: "CRC",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Caracas Sports Club",
                symbol: "CSC",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Caracas Teather Club",
                symbol: "CTC",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Centre Catala",
                symbol: "CAT",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Centro Asturiano de Caracas",
                symbol: "AST",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Centro Deportivo Hebraica",
                symbol: "HEB",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Centro Italiano Venezolano",
                symbol: "CIV",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Centro Portugues",
                symbol: "POR",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Círculo Militar de Caracas",
                symbol: "CMC",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Club Campestre Los Cortijos",
                symbol: "CLC",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Club Hípico de Caracas",
                symbol: "HIP",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Club Miranda",
                symbol: "MIR",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Club Puerto Azul",
                symbol: "CPA",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Club Santa Paula",
                symbol: "CSP",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Club Táchira",
                symbol: "TAC",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Hermandad Gallega de Venezuela",
                symbol: "HGV",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Hogar Canario de Venezuela",
                symbol: "HCV",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Izcaragua Country Club",
                symbol: "IZC",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Lagunita Country Club",
                symbol: "LCC",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Monteclaro Country Club",
                symbol: "MON",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                clubId: v4(),
                name: "Valle Arriba Golf Club",
                symbol: "VAG",
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);


        const id5MM = v4();
        const id6M = v4();
        const id6MM = v4();
        const id4F = v4();
        const id5F = v4();
        const id6F = v4();

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
                categoryId: id4F,
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
                categoryId: id5F,
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
                categoryId: id5MM,
                name: "5MM",
                fullName: "5ta Masculina Master",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                categoryId: id6F,
                name: "6F",
                fullName: "6ta Femenina",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                categoryId: id6M,
                name: "6M",
                fullName: "6ta Masculina",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                categoryId: id6MM,
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

        await queryInterface.bulkInsert("team", [
            {
                teamId: v4(),
                clubId: clubIdVAT,
                categoryId: id5MM,
                name: "A",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                teamId: v4(),
                clubId: clubIdVAT,
                categoryId: id6M,
                name: "A",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                teamId: v4(),
                clubId: clubIdVAT,
                categoryId: id6M,
                name: "B",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                teamId: v4(),
                clubId: clubIdVAT,
                categoryId: id6M,
                name: "C",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                teamId: v4(),
                clubId: clubIdVAT,
                categoryId: id6MM,
                name: "A",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                teamId: v4(),
                clubId: clubIdVAT,
                categoryId: id4F,
                name: "A",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                teamId: v4(),
                clubId: clubIdVAT,
                categoryId: id5F,
                name: "A",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                teamId: v4(),
                clubId: clubIdVAT,
                categoryId: id6F,
                name: "A",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                teamId: v4(),
                clubId: clubIdVAT,
                categoryId: id6F,
                name: "B",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])

        /* Players for test */
        const userId1 = v4();

        const SALT_ROUNDS = 5;
        const password = await bcrypt.hash("12345678", SALT_ROUNDS);

        await queryInterface.bulkInsert("users", [
            {
                userId: userId1,
                email: "test@player.com",
                password,
                firstName: "test",
                lastName: "player",
                isPlayer: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        await queryInterface.bulkInsert("player", [
            {
                playerId: v4(),
                clubId: clubIdVAT,
                userId: userId1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
        /* Players for test */
    },

    async down(queryInterface, _) {
        await queryInterface.bulkDelete('club', null, {});
        await queryInterface.bulkDelete('category', null, {});
        await queryInterface.bulkDelete('team', null, {});
    }
};
