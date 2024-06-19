import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../../config/config";

const sequelize: Sequelize = config.connection;

interface ClubData extends Model<InferAttributes<ClubData>> {
    clubId: string;
    name: string;
    symbol: string;
    code: string | null;
    isSubscribed: boolean;
}

const ClubModel = sequelize.define<ClubData>(
    "club",
    {
        clubId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        symbol: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        isSubscribed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: "club",
    }
);

export { ClubModel, ClubData };
