"use strict";

const { v4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("user", [
            {
                userId: v4(),
                email: "aizarra2015@gmail.com",
                password: "j2osqcdm",
                firstName: "Andre",
                lastName: "Izarra",
                isAdmin: true,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("user", {});
    },
};
