import { SequelizeBracketRepository } from "./impl/sequelizeBracketRepo";
import { SequelizeContestClashRepository } from "./impl/sequelizeContestClashRepo";
import { SequlizeContestRepository } from "./impl/sequelizeContestRepo";
import { SequelizeContestTeamRepository } from "./impl/sequelizeContestTeamRepo";
import { SequelizeCoupleRegisterRepository } from "./impl/sequelizeCoupleRegisterRepo";
import { SequelizeCoupleRepository } from "./impl/sequelizeCoupleRepo";
import { SequelizeRegisterParticipantsRepository } from "./impl/sequelizeParticipantRegisterRepo";
import { SequelizeParticipantRepository } from "./impl/sequelizeParticipantRepo";
import { SequelizeParticipantTrackerRepository } from "./impl/sequelizeParticipantTrackerRepo";
import { SequelizeTournamentAdRepository } from "./impl/sequelizeTournamentAdRepo";
import { SequelizeTournamentMatchRepository } from "./impl/sequelizeTournamentMatchRepo";
import { SequelizeTournamentRepository } from "./impl/sequelizeTournamentRepo";
import { SequelizeTournamentMatchTrackerRepo } from "./impl/sequelizeTrackerRepo";

export const sequelizeTournamentRepo = new SequelizeTournamentRepository();

export const sequelizeRegisterParticipantRepo =
    new SequelizeRegisterParticipantsRepository();

export const sequelizeParticipantRepo = new SequelizeParticipantRepository();

export const sequelizeCoupleRepo = new SequelizeCoupleRepository(
    sequelizeParticipantRepo
);

export const sequelizeParticipantTrackerRepo =
    new SequelizeParticipantTrackerRepository();

export const sequelizeTournamentMatchTrackerRepo =
    new SequelizeTournamentMatchTrackerRepo(sequelizeParticipantTrackerRepo);

export const sequelizeTournamentMatchRepo =
    new SequelizeTournamentMatchRepository(
        sequelizeParticipantRepo,
        sequelizeTournamentMatchTrackerRepo
    );

export const sequelizeBracketRepo = new SequelizeBracketRepository(
    sequelizeParticipantRepo,
    sequelizeCoupleRepo,
    sequelizeTournamentMatchRepo
);

export const sequelizeRegisterCouplesRepo =
    new SequelizeCoupleRegisterRepository();

export const sequelizeTournamentAdsRepo = new SequelizeTournamentAdRepository();

export const sequelizeContestTeamRepo = new SequelizeContestTeamRepository();

export const sequelizeContestRepo = new SequlizeContestRepository(
    sequelizeParticipantRepo,
    sequelizeCoupleRepo,
    sequelizeContestTeamRepo
);

export const sequelizeContestClashRepo = new SequelizeContestClashRepository(
    sequelizeContestTeamRepo
);
