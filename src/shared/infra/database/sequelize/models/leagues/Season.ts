import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../../config/config";
import { LeagueModel } from "./League";

const sequelize: Sequelize = config.connection;

interface SeasonData extends Model<InferAttributes<SeasonData>> {
    seasonId: string;
    leagueId: string;
    name: string;
    isFinish: boolean;
    isCurrentSeason: boolean;
}

const SeasonModel = sequelize.define<SeasonData>(
    "season",
    {
        seasonId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        leagueId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "league",
                key: "leagueId",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isFinish: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        isCurrentSeason: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    { tableName: "season" }
);

SeasonModel.belongsTo(LeagueModel, {
    foreignKey: "leagueId",
    targetKey: "leagueId",
    as: "League",
});

export { SeasonModel, SeasonData };
