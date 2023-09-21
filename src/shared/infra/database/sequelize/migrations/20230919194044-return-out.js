'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("playerTracker", "firstReturnOut", {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0,
        });

        await queryInterface.addColumn("playerTracker", "secondReturnOut", {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("playerTracker", "firstReturnOut");
        await queryInterface.removeColumn("playerTracker", "secondReturnOut");
    }
};
