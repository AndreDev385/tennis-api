import { Sequelize } from "sequelize";
import models from ".";

export default (sequelize: Sequelize, DataTypes: any) => {
    const UserModel = sequelize.define(
        "user",
        {
            userId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING(250),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null,
            },
            firstName: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: true,
            },
            accessToken: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null,
            },
        },
        { timestamps: false, tableName: "user" }
    );

    UserModel.hasOne(models.PlayerModel);

    return UserModel;
};
