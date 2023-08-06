import models from "../../../shared/infra/database/sequelize/models";

import { SequelizeClubRepository } from "./implementations/sequelizeClubRepo";
import { SequelizeTrackerRepository } from "./implementations/sequelizeTrackerRepo";
import { SequelizeSeasonRepository } from "./implementations/sequelizeSeasonRepo";
import { SequelizeCategoryRepository } from "./implementations/sequelizeCategoryRepo";
import { SequelizeClashRepo } from "./implementations/sequelizeClashRepo";
import { SequelizeLeagueRepository } from "./implementations/sequelizeLeagueRepo";
import { SequelizePlayerRepository } from "./implementations/sequelizePlayerRepo";
import { SequelizeMatchRepository } from "./implementations/sequelizeMatchRepo";
import { SequelizePlayerTrackerRepository } from "./implementations/sequelizePlayerTrackerRepo";
import { SequelizeTeamRepository } from "./implementations/sequelizeTeamRepo";
import { SequelizeJourneyRepository } from "./implementations/sequelizeJourneyRepo";
import { SequelizeTeamStatsRepository } from "./implementations/sequelizeTeamStatsRepo";

const sequelizeClubRepo = new SequelizeClubRepository(models);
const sequelizeCategoryRepo = new SequelizeCategoryRepository(models);
const sequelizeSeasonRepo = new SequelizeSeasonRepository(models);
const sequelizePlayerTrackerRepo = new SequelizePlayerTrackerRepository(models);
const sequelizeTrackerRepo = new SequelizeTrackerRepository(
    models,
    sequelizePlayerTrackerRepo
);
const sequelizeLeagueRepo = new SequelizeLeagueRepository(models);
const sequelizePlayerRepo = new SequelizePlayerRepository(models);
const sequelizeMatchRepo = new SequelizeMatchRepository(
    models,
    sequelizeTrackerRepo,
    sequelizePlayerRepo
);

const sequelizeTeamRepo = new SequelizeTeamRepository(models);
const sequelizeClashRepo = new SequelizeClashRepo(
    models,
    sequelizeMatchRepo,
    sequelizeTeamRepo,
    sequelizeClubRepo,
);
const sequelizeJourneyRepo = new SequelizeJourneyRepository(models);
const sequelizeTeamStatsRepo = new SequelizeTeamStatsRepository(models);

export {
    sequelizeLeagueRepo,
    sequelizeClashRepo,
    sequelizeClubRepo,
    sequelizeCategoryRepo,
    sequelizeSeasonRepo,
    sequelizeTrackerRepo,
    sequelizePlayerRepo,
    sequelizeMatchRepo,
    sequelizeTeamRepo,
    sequelizeJourneyRepo,
    sequelizeTeamStatsRepo,
    sequelizePlayerTrackerRepo,
};
