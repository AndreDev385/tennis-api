import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

interface AdData extends Model<InferAttributes<AdData>> {
    adId: string;
    clubId: string;
    link: string;
    image: string;
}

const AdModel = sequelize.define<AdData>(
    "ad",
    {
        adId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        clubId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "club",
                key: "clubId",
            },
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "ad",
    }
);

export { AdModel, AdData };
