import { SequelizeClubRepository } from "./sequelizeClubRepo"
import { SequelizeTrackerRepository } from "./sequelizeTrackerRepo"
import { SequelizeSeasonRepository } from "./sequelizeSeasonRepo"
import { SequelizeCategoryRepository } from "./sequelizeCategoryRepo"
import models from "../../../../shared/infra/database/sequelize/models";
import { SequelizeClashRepo } from "./sequelizeClashRepo";
import { SequelizeLeagueRepository } from "./sequelizeLeagueRepo";

const sequelizeClubRepo = new SequelizeClubRepository(models);
const sequelizeCategoryRepo = new SequelizeCategoryRepository(models);
const sequelizeSeasonRepo = new SequelizeSeasonRepository(models);
const sequelizeTrackerRepo = new SequelizeTrackerRepository(models);
const sequelizeClashRepo = new SequelizeClashRepo(models);
const sequelizeLeagueRepo = new SequelizeLeagueRepository(models);

export {
    sequelizeLeagueRepo,
    sequelizeClashRepo,
    sequelizeClubRepo,
    sequelizeCategoryRepo,
    sequelizeSeasonRepo,
    sequelizeTrackerRepo,
}
