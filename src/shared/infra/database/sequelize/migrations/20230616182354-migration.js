"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const CREATE_USER_TABLE = () => {
            return queryInterface.createTable("user", {
                userId: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                email: {
                    type: Sequelize.STRING(250),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: true,
                    defaultValue: null,
                },
                firstName: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                lastName: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                isAdmin: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                    allowNull: true,
                },
                accessToken: {
                    type: Sequelize.STRING,
                    allowNull: true,
                    defaultValue: null,
                },
            });
        };

        await CREATE_USER_TABLE();
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("user");
    },
};
