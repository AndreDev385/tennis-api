import {
    sequelizeContestClashRepo,
    sequelizeTournamentMatchRepo,
    sequelizeTournamentRepo,
} from "../../repository";
import { CheckClashIsFinished } from "./check";
import { CheckClashIsFinishedController } from "./checkClashIsFinishedController";

export const checkClashIsFinish = new CheckClashIsFinished(
    sequelizeContestClashRepo,
    sequelizeTournamentMatchRepo,
    sequelizeTournamentRepo
);

export const checkClashIsFinishedCtrl = new CheckClashIsFinishedController(
    checkClashIsFinish
);
