import models from "../../../shared/infra/database/sequelize/models";

import { SequelizeClubRepository } from "./implementations/sequelizeClubRepo";
import { SequelizeTrackerRepository } from "./implementations/sequelizeTrackerRepo";
import { SequelizeSeasonRepository } from "./implementations/sequelizeSeasonRepo";
import { SequelizeCategoryRepository } from "./implementations/sequelizeCategoryRepo";
import { SequelizeClashRepo } from "./implementations/sequelizeClashRepo";
import { SequelizeLeagueRepository } from "./implementations/sequelizeLeagueRepo";
import { SequelizePlayerRepository } from "./implementations/sequelizePlayerRepo";
import { SequelizeMatchRepository } from "./implementations/sequelizeMatchRepo";

const sequelizeClubRepo = new SequelizeClubRepository(models);
const sequelizeCategoryRepo = new SequelizeCategoryRepository(models);
const sequelizeSeasonRepo = new SequelizeSeasonRepository(models);
const sequelizeTrackerRepo = new SequelizeTrackerRepository(models);
const sequelizeClashRepo = new SequelizeClashRepo(models);
const sequelizeLeagueRepo = new SequelizeLeagueRepository(models);
const sequelizePlayerRepo = new SequelizePlayerRepository(models);
const sequelizeMatchRepo = new SequelizeMatchRepository(
    models,
    sequelizeTrackerRepo
);

export {
    sequelizeLeagueRepo,
    sequelizeClashRepo,
    sequelizeClubRepo,
    sequelizeCategoryRepo,
    sequelizeSeasonRepo,
    sequelizeTrackerRepo,
    sequelizePlayerRepo,
    sequelizeMatchRepo,
};
