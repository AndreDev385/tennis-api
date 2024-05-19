import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../../config/config";

const sequelize: Sequelize = config.connection;

interface ClubEventData extends Model<InferAttributes<ClubEventData>> {
    clubEventId: string;
    clubId: string;
    link: string;
    image: string;
}

const ClubEventModel = sequelize.define<ClubEventData>(
    "clubEvent",
    {
        clubEventId: {
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
        tableName: "clubEvent",
    }
);

export { ClubEventModel, ClubEventData };
