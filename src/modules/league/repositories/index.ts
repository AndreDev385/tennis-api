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
import { SequelizeClubEventRepository } from "./implementations/sequelizeClubEventRepo";
import { SequelizeAdRepository } from "./implementations/sequelizeAdRepo";
import { SequelizeRankingRepository } from "./implementations/sequelizeRankingRepo";
import { SequelizePausedMatchRepository } from "./implementations/sequelizePausedMatchRepo";

const sequelizeClubRepo = new SequelizeClubRepository();
const sequelizeCategoryRepo = new SequelizeCategoryRepository();
const sequelizeSeasonRepo = new SequelizeSeasonRepository();
const sequelizePlayerTrackerRepo = new SequelizePlayerTrackerRepository();
const sequelizeTrackerRepo = new SequelizeTrackerRepository(
    sequelizePlayerTrackerRepo
);
const sequelizeLeagueRepo = new SequelizeLeagueRepository();
const sequelizePlayerRepo = new SequelizePlayerRepository();
const sequelizeMatchRepo = new SequelizeMatchRepository(
    sequelizeTrackerRepo,
    sequelizePlayerRepo
);

const sequelizeTeamRepo = new SequelizeTeamRepository();
const sequelizeClashRepo = new SequelizeClashRepo(
    sequelizeMatchRepo,
    sequelizeTeamRepo,
    sequelizeClubRepo,
);
const sequelizeJourneyRepo = new SequelizeJourneyRepository();
const sequelizeTeamStatsRepo = new SequelizeTeamStatsRepository();

const sequelizeClubEventRepo = new SequelizeClubEventRepository();
const sequelizeAdRepo = new SequelizeAdRepository();
const sequelizeRankingRepo = new SequelizeRankingRepository(sequelizeTeamRepo);

const sequelizePausedMatchRepo = new SequelizePausedMatchRepository(sequelizeTrackerRepo);

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
    sequelizeClubEventRepo,
    sequelizeAdRepo,
    sequelizeRankingRepo,
    sequelizePausedMatchRepo,
};
