import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../../config/config";

const sequelize: Sequelize = config.connection;

interface CoupleData extends Model<InferAttributes<CoupleData>> {
    coupleId: string;
    p1Id: string;
    p2Id: string;
}

const CoupleModel = sequelize.define<CoupleData>("couple", {
    coupleId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    p1Id: {
        type: DataTypes.UUID,
    },
    p2Id: {
        type: DataTypes.UUID,
    },
});

export { CoupleModel, CoupleData };
