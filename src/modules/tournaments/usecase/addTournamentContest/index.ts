import { sequelizeCategoryRepo } from "../../../league/repositories";
import {
    sequelizeContestRepo,
    sequelizeTournamentRepo,
} from "../../repository";
import { AddTournamentContest } from "./addTournamentContest";
import { AddTournamentContestController } from "./addTournamentContestController";

const addTournamentContest = new AddTournamentContest(
    sequelizeContestRepo,
    sequelizeTournamentRepo,
    sequelizeCategoryRepo
);

export const addTournamentContestCtrl = new AddTournamentContestController(
    addTournamentContest
);
