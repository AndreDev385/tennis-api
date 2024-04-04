import { SequelizeBracketRepository } from "./impl/sequelizeBracketRepo";
import { SequlizeContestRepository } from "./impl/sequelizeContestRepo";
import { SequelizeCoupleRegisterRepository } from "./impl/sequelizeCoupleRegisterRepo";
import { SequelizeCoupleRepository } from "./impl/sequelizeCoupleRepo";
import { SequelizeRegisterParticipantsRepository } from "./impl/sequelizeParticipantRegisterRepo";
import { SequelizeParticipantRepository } from "./impl/sequelizeParticipantRepo";
import { SequelizeTournamentMatchRepository } from "./impl/sequelizeTournamentMatchRepo";
import { SequelizeTournamentRepository } from "./impl/sequelizeTournamentRepo";

const sequelizeTournamentRepo = new SequelizeTournamentRepository();

const sequelizeRegisterParticipantRepo =
    new SequelizeRegisterParticipantsRepository();

const sequelizeParticipantRepo = new SequelizeParticipantRepository();

const sequelizeCoupleRepo = new SequelizeCoupleRepository(
    sequelizeParticipantRepo
);

const sequelizeContestRepo = new SequlizeContestRepository(
    sequelizeParticipantRepo,
    sequelizeCoupleRepo
);

const sequelizeTournamentMatchRepo = new SequelizeTournamentMatchRepository();

const sequelizeBracketRepo = new SequelizeBracketRepository(
    sequelizeParticipantRepo,
    sequelizeCoupleRepo,
    sequelizeTournamentMatchRepo
);

const sequelizeRegisterCouplesRepo = new SequelizeCoupleRegisterRepository()

export {
    sequelizeTournamentRepo,
    sequelizeRegisterParticipantRepo,
    sequelizeParticipantRepo,
    sequelizeContestRepo,
    sequelizeBracketRepo,
    sequelizeCoupleRepo,
    sequelizeRegisterCouplesRepo,
};
