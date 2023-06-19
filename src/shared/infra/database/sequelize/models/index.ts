import * as Sequelize from "sequelize";

import config from "../config/config";
import UserModel from "./BaseUser";
import PlayerTrackerModel from "./PlayerTracker";
import PlayerModel from "./Player";
import TrackerModel from "./Tracker";
import MatchModel from "./Match";

const sequelize = config.connection;

const models = {
    UserModel: UserModel(sequelize, Sequelize.DataTypes),
    PlayerModel: PlayerModel(sequelize, Sequelize.DataTypes),
    PlayerTrackerModel: PlayerTrackerModel(sequelize, Sequelize.DataTypes),
    TrackerModel: TrackerModel(sequelize, Sequelize.DataTypes),
    MatchModel: MatchModel(sequelize, Sequelize.DataTypes),
};

export default models;
